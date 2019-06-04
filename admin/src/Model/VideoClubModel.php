<?php

namespace Model;

class VideoClubModel extends \Model\BaseStalkerModel {

    public function __construct() {
        parent::__construct();
    }

    public function getTotalRowsVideoList($where = array(), $like = array()) {
        $params = array(
            /*'select' => array("*"),*/
            'where' => $where,
            'like' => array(),
            'order' => array()
        );
        if (!empty($like)) {
            $params['like'] = $like;
        }
        return $this->getVideoList($params, TRUE);
    }
   
    public function getVideoList($param, $counter = FALSE) {
        if (!empty($param['select'])) {
            $this->mysqlInstance->select($param['select']);
        }
        $this->mysqlInstance->from('video')
                    ->join('media_claims', 'video.id', 'media_claims.media_id and media_claims.media_type = "vclub"', 'LEFT')
                    ->join('video_on_tasks', 'video.id', 'video_on_tasks.video_id', 'LEFT')
                    ->where($param['where'])->like($param['like'], 'OR');
        if (!empty($param['order'])) {
            $this->mysqlInstance->orderby($param['order']);
        }
        
        if (!empty($param['limit']['limit'])) {
            $this->mysqlInstance->limit($param['limit']['limit'], $param['limit']['offset']);
        }
//        if (!$counter) {print_r($this->mysqlInstance->get()); exit;}
        return ($counter) ? $this->mysqlInstance->count()->get()->counter() : $this->mysqlInstance->get()->all();
    }
    
    public function getVideoById($id) {
        return $this->mysqlInstance->from('video')->where(array('id' => $id))->get()->first();
    }

    public function videoLogWrite($video, $text, $moderator_id = null) {

        if ($moderator_id === null) {
            $moderator_id = array_key_exists('uid', $_SESSION) ? $_SESSION['uid'] : FALSE;
        }

        return $this->mysqlInstance->insert('video_log', array(
                    'action' => $text,
                    'video_id' => $video['id'],
                    'video_name' => $video['name'],
                    'moderator_id' => $moderator_id,
                    'actiontime' => 'NOW()'
                ))->insert_id();
    }

    public function getTotalRowsVideoLog($where = array(), $like = array()){
        $this->mysqlInstance->count()->from('video_log')
                ->join('administrators', 'video_log.moderator_id', 'administrators.id', 'LEFT')
                ->where($where);
        if (!empty($like)) {
            $this->mysqlInstance->like($like, 'OR');
        }
        return $this->mysqlInstance->get()->counter();
    }

    public function getVideoLog($param){
        if (!empty($param['select'])) {
            $this->mysqlInstance->select($param['select']);
        }
        $this->mysqlInstance->from('video_log')
                ->join('administrators', 'video_log.moderator_id', 'administrators.id', 'LEFT')
                ->join('video', 'video_log.video_id', 'video.id', 'LEFT')
                ->where($param['where'])->like($param['like'], 'OR')->orderby($param['order']);
        if (!empty($param['limit']['limit'])) {
            $this->mysqlInstance->limit($param['limit']['limit'], $param['limit']['offset']);
        }
        
/*        print_r($this->mysqlInstance->get());
        exit;*/
        
        return $this->mysqlInstance->get()->all();
    }

    public function removeVideoById($video_id) {
        return $this->mysqlInstance->delete('video', array('id' => $video_id))->total_rows();
    }

    public function disableVideoById($video_id) {
        return $this->mysqlInstance->update('video', array('accessed' => 0, 'added' => 'NOW()'), array('id' => $video_id))->total_rows();
    }

    public function enableVideoById($video_id) {
        $this->mysqlInstance->update('updated_places', array('vclub' => 1));
        return $this->mysqlInstance->update('video', array('accessed' => 1, 'added' => 'NOW()'), array('id' => $video_id))->total_rows();
    }

    public function toggleDisableForHDDevices($video, $val) {
        if ($video['hd'] && $val) {
            return $this->mysqlInstance->update('video', array('disable_for_hd_devices' => 1), array(
                        'name' => $video['name'],
                        'o_name' => $video['o_name'],
                        'director' => $video['director'],
                        'year' => $video['year'],
                        'hd' => 0
                    ))->total_rows();
        }
        return TRUE;
    }

    public function deleteVideoTask($params) {
        return $this->mysqlInstance->delete('video_on_tasks', $params)->total_rows();
    }

    public function addVideoTask($data) {
        return $this->mysqlInstance->insert('video_on_tasks', $data)->insert_id();
    }

    public function updateVideoTask($data, $params) {
        return $this->mysqlInstance->update('video_on_tasks', $data, $params)->total_rows();
    }

    public function getVideoTaskByVideoId($video_id) {
        return $this->mysqlInstance->from('video_on_tasks')->where(array('video_id' => $video_id))->get()->first();
    }

    public function setModeratorTask($data) {
        return $this->mysqlInstance->insert('moderator_tasks', array(
                    'to_usr' => $data['to_usr'],
                    'media_type' => 2,
                    'media_id' => $data['id'],
                    'start_time' => 'NOW()'
                ))->insert_id();
    }
    
    public function getModeratorTasksById($task_id) {
        return $this->mysqlInstance->select('moderator_tasks')->where(array('id' => $task_id))->orderby(array('id' => 'desc'))->get()->first();
    }

    public function setModeratorHistory($data) {
        return $this->mysqlInstance->insert('moderators_history', array(
                    'task_id' => $data["task_id"],
                    'from_usr' => $data['uid'],
                    'to_usr' => $data['to_usr'],
                    'comment' => $data['comment'],
                    'send_time' => 'NOW()'
                ))->insert_id();
    }
    
    public function getAllAdmins() {
        return $this->mysqlInstance->from('administrators')->get()->all();
    }
    
    public function getModerators($id = FALSE) {
        $this->mysqlInstance->from('moderators');
        if ($id !== FALSE) {
            return $this->mysqlInstance->where(array('id' => $id))->get()->first();
        } else {
            return $this->mysqlInstance->get()->all();
        }
    }
    
    public function deleteModeratorsById($id) {
        return $this->mysqlInstance->delete('moderators', array('id' => $id))->total_rows();
    }

    public function updateModeratorsById($id, $data) {
        return $this->mysqlInstance->update('moderators', $data, array('id' => $id))->total_rows();
    }
    
    public function insertModerators($data) {
        return $this->mysqlInstance->insert('moderators', $data)->insert_id();
    }
    
    public function checkModMac($mac_adress){
        return $this->mysqlInstance->count()->from('moderators')->where(array('mac' => $mac_adress))->get()->counter();
    }
    
    public function getAllModeratorTasks($moderator_id = FALSE) {
        $add_where = ($moderator_id !== FALSE ? " and moderator_tasks.to_usr = $moderator_id": '');
        return $this->mysqlInstance->query("select moderator_tasks.*, unix_timestamp(end_time) as `end_time`
                                            from moderator_tasks
                                            order by id")->all();
                                            /*where moderator_tasks.ended = 0 $add_where*/
    }
    
    public function getAllVideoTasks($params = FALSE) {
        $this->mysqlInstance->select('video_on_tasks.*, video_on_tasks.id as task_id, video_on_tasks.added as task_added, video.*')
                                    ->from('video_on_tasks')
                                    ->join('video', 'video.id', 'video_on_tasks.video_id', 'INNER');
        if ($params !== FALSE) {
            $this->mysqlInstance->where($params);
        }
        return $this->mysqlInstance->orderby('date_on')->get()->all();
    }
    
    public function getVideoGenres() {
        return $this->mysqlInstance->from('genre')->orderby('title')->get()->all();
    }
    
    public function getCategoriesGenres($param = array()) {
        if (!empty($param['select'])) {
            $this->mysqlInstance->select($param['select']);
        }

        $this->mysqlInstance->from('media_category');
        if (!empty($param['where'])) {
            $this->mysqlInstance->where($param['where']);
        }
        if (!empty($param['like'])) {
            $this->mysqlInstance->like($param['like'], 'OR');
        }
        if (!empty($param['order'])) {
            $this->mysqlInstance->orderby($param['order']);
        } else {
            $this->mysqlInstance->orderby('id');
        }
        if (!empty($param['limit']['limit'])) {
            $this->mysqlInstance->limit($param['limit']['limit'], ( array_key_exists('offset', $param['limit']) ? $param['limit']['offset']: FALSE ) );
        }

        return $this->mysqlInstance->get()->all();
    }

    public function getTotalRowsCategoriesGenresList($where = array(), $like = array()) {
        $this->mysqlInstance->count()->from('media_category')->where($where);
        if (!empty($like)) {
            $this->mysqlInstance->like($like, 'OR');
        }
        return $this->mysqlInstance->get()->counter();
    }

    public function insertCategoriesGenres($param){
        return $this->mysqlInstance->insert('media_category', $param)->insert_id();
    }

    public function updateCategoriesGenres($data, $param){
        unset($data['id']);
        return $this->mysqlInstance->update('media_category', $data, $param)->total_rows();
    }

    public function deleteCategoriesGenres($param){
        return $this->mysqlInstance->delete('media_category', $param)->total_rows();
    }

    public function getVideoCategories() {
        return$this->mysqlInstance->from('cat_genre')->orderby('category_alias, id')->get()->all();
    }

    public function getVideoCatGenres($param) {
        if (!empty($param['select'])) {
            $this->mysqlInstance->select($param['select']);
        }

        $this->mysqlInstance->from('cat_genre')->join('media_category', 'cat_genre.category_alias', 'media_category.category_alias', 'LEFT');
        if (!empty($param['where'])) {
            $this->mysqlInstance->where($param['where']);
        }
        if (!empty($param['like'])) {
            $this->mysqlInstance->like($param['like'], 'OR');
        }
        if (!empty($param['order'])) {
            $this->mysqlInstance->orderby($param['order']);
        } else {
            $this->mysqlInstance->orderby('cat_genre.id');
        }
        if (!empty($param['limit']['limit'])) {
            $this->mysqlInstance->limit($param['limit']['limit'], ( array_key_exists('offset', $param['limit']) ? $param['limit']['offset']: FALSE ) );
        }

        return $this->mysqlInstance->get()->all();
    }

    public function getTotalRowsVideoCatGenresList($where = array(), $like = array()) {
        $this->mysqlInstance->count()->from('cat_genre')
            ->join('media_category', 'cat_genre.category_alias', 'media_category.category_alias', 'LEFT')
            ->where($where);
        if (!empty($like)) {
            $this->mysqlInstance->like($like, 'OR');
        }
        return $this->mysqlInstance->get()->counter();
    }

    public function insertVideoCatGenres($data = array()){
        return $this->mysqlInstance->insert('cat_genre', $data['data'])->total_rows();
    }

    public function updateVideoCatGenres($data = array()){
        return $this->mysqlInstance->update('cat_genre', $data['data'], $data['where'])->total_rows();
    }

    public function deleteVideoCatGenres($param){
        return $this->mysqlInstance->delete('cat_genre', $param)->total_rows();
    }

    public function checkName($params) {
        $where['name'] = $params['name'];
        if (array_key_exists('year', $params) && !empty($params['year'])) {
            $where['year'] = $params['year'];
        }
        if (array_key_exists('id<>', $params) && !empty($params['id<>'])) {
            $where['id<>'] = $params['id<>'];
        }
        return $this->mysqlInstance->count()->from('video')->where($where)->get()->counter();
    }
    
    public function saveScreenshotData($data) {
        return $this->mysqlInstance->insert('screenshots', array('name' => $data['name'],'size' => $data['size'],'type' => $data['type']))->insert_id();
    }
    
    public function removeScreenshotData($id) {
        return $this->mysqlInstance->delete('screenshots', array('id' => $id))->total_rows();
    }
    
    public function cleanScreenshotData() {
        return $this->mysqlInstance->delete('screenshots', array('media_id' => 0))->total_rows();
    }
    
    public function updateScreenshotData($video_id, $id) {
        return $this->mysqlInstance->update('screenshots', array('media_id' => $video_id), array('id' => $id))->total_rows();
    }
    
    public function getScreenshotData($video_id) {
        return $this->mysqlInstance->from('screenshots')->where(array('media_id' => $video_id))->orderby(array('id' => 'desc'))->get()->first('id');
    }
    
    public function insertVideo($data) {
        return $this->mysqlInstance->insert('video', $data)->insert_id();
    }
    
    public function updateVideo($data, $id) {
        return $this->mysqlInstance->update('video', $data , array('id' => $id))->total_rows();
    }
    
    public function getVideoByParam($param) {
        return $this->mysqlInstance->from('video')->where($param)->get()->first();
    }
}
