<?php

namespace Stalker\Lib\RESTAPI\v2;

class RESTApiTvChannelLink1 extends RESTApiController
{
    protected $name = 'link1';
    private   $user_channels;
    private   $params;

    public function __construct($nested_params){

        $this->params = $nested_params;
    }

    public function get(RESTApiRequest $request, $parent_id){

        if (empty($this->params['users.id'])){
            throw new RESTBadRequest("User required");
        }

        $user_id = $this->params['users.id'];

        $user = \Stb::getById($user_id);

        if (empty($user)){
            throw new RESTNotFound("User not found");
        }

        $itv = \Itv::getInstance();

        $this->user_channels = $itv->getAllUserChannelsIdsByUid($user['id']);

        if (!in_array($parent_id, $this->user_channels)){
            throw new RESTForbidden("User don't have access to this channel");
        }

        $channel = \Itv::getById($parent_id);

        if (empty($channel)){
            throw new RESTNotFound("Channel not found");
        }

        $start = $request->getParam('start');

        if ($start){
            // todo: time shift!
            throw new RESTNotFound("Time shift in progress...");
        }
//        $urls = \Itv::getUrlsForChannel($channel['id']);
	$urls = \Itv::getUrlsForChannel($channel['id'],false,"WiFi");
        if (!empty($urls)){
            $link = $urls[0]['id'];
        }else{
            $link = null;
        }

        try{
             $url = $itv->getUrlByChannelId($parent_id, $link);
        }catch (\ItvChannelTemporaryUnavailable $e){
            throw new RESTNotFound($e->getMessage());
        }

        if (preg_match("/(\S+:\/\/\S+)/", $url, $match)){
            $url = $match[1];
        }

        return $url;
    }
}
