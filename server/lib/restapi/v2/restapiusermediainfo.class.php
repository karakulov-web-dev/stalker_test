<?php

namespace Stalker\Lib\RESTAPI\v2;

class RESTApiUserMediaInfo extends RESTApiController
{

    protected $name = 'media-info';
    protected $types_map = array(
        'tv-channel' => array(
            'code'   => 1,
            'target' => 'itv',
            'title_field' => 'name'
        ),
        'video'      => array(
            'code'   => 2,
            'target' => 'video',
            'title_field' => 'name'
        ),
        'karaoke'    => array(
            'code'   => 3,
            'target' => 'karaoke',
            'title_field' => 'name'
        ),
        'tv-archive' => array(
            'code'   => 11,
            'target' => 'epg',
            'title_field' => 'name'
        )
    );

    public function __construct(){}

    public function create(RESTApiRequest $request, $parent_id){

        $type     = $request->getData('type');
        $media_id = (int) $request->getData('media_id');

        if (empty($type)){
            throw new RESTBadRequest("Type is empty");
        }

        if (empty($media_id)){
            throw new RESTBadRequest("Media ID is empty");
        }

        if (empty($this->types_map[$type])){
            throw new RESTBadRequest("Type is not supported");
        }

        $media = \Mysql::getInstance()->from($this->types_map[$type]['target'])
            ->where(array('id' => $media_id))
            ->get()->first();

        if (empty($media)){
            throw new RESTNotFound("Media not found");
        }

        //todo: save storage name for video and karaoke?
        //todo: load balancing

        if ($type == 'tv-archive'){

            $channel = \Itv::getChannelById($media['ch_id']);

            $now_playing_content = $channel ? $channel['name'] : '--';

        }else{
            $now_playing_content = $media[$this->types_map[$type]['title_field']];
        }

        return \Mysql::getInstance()->update('users',
            array(
                 'now_playing_type'    => $this->types_map[$type]['code'],
                 'now_playing_link_id' => $media_id,
                 'now_playing_content' => $now_playing_content,
                 'now_playing_start'   => 'NOW()',
                 'last_active'         => 'NOW()',
            ),
            array('id' => $parent_id)
        )->result();
    }

    public function delete(RESTApiRequest $request, $parent_id){

        $user = \Mysql::getInstance()->from('users')->where(array('id' => $parent_id))->get()->first();

        if (!empty($user['now_playing_link_id'])){
            switch ($user['now_playing_type']){
                case 1: // tv

                    if (time() - strtotime($user['now_playing_start']) > 30*60){ // more then 30 min
                        \Mysql::getInstance()->insert('played_itv', array(
                            'itv_id'      => $user['now_playing_link_id'],
                            'uid'         => $parent_id,
                            'playtime'    => 'NOW()',
                            'user_locale' => $user['locale']
                        ));
                    }

                    break;
                case 2: // video

                    if (time() - strtotime($user['now_playing_start']) > 60*60){ // more then 1 hour (70% can't be counted)
                        \Mysql::getInstance()->insert('played_video', array(
                            'video_id' => $user['now_playing_link_id'],
                            'uid'      => $parent_id,
                            'playtime' => 'NOW()'
                        ));
                    }

                    break;

                case 11: // tvarchive

                    if (time() - strtotime($user['now_playing_start']) > 60) { // more then 1 min

                        $program = \Mysql::getInstance()->from('epg')->where(array('id' => $user['now_playing_link_id']))->get()->first();

                        if (!empty($program)){
                            \Mysql::getInstance()->insert('played_tv_archive', array(
                                'ch_id'    => $program['ch_id'],
                                'uid'      => $parent_id,
                                'playtime' => 'NOW()',
                                'length'   => time() - strtotime($user['now_playing_start'])
                            ));
                        }
                    }

                    break;
            }
        }

        return \Mysql::getInstance()->update('users',
            array(
                 'now_playing_type'    => '',
                 'now_playing_content' => '',
                 'last_active'         => 'NOW()',
            ),
            array('id' => $parent_id)
        )->result();
    }
}