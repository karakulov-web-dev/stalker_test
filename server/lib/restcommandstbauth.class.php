<?php

class RESTCommandStbAuth extends RESTCommand
{
    public function update(RESTRequest $request){

        $stb_list = $request->getConvertedIdentifiers();

        if (empty($stb_list)){
            throw new RESTCommandException('Empty stb list');
        }

        foreach ($stb_list as $uid){
            Mysql::getInstance()->update('users',
                array('access_token' => strtoupper(md5(microtime(1).uniqid()))),
                array('id' => $uid)
            );

            Mysql::getInstance()
                 ->update('access_tokens',
                     array(
                         'token'         => 'invalid_'.md5(microtime(1).uniqid()),
                         'refresh_token' => 'invalid_'.md5(microtime(1).uniqid()),
                     ),
                     array('uid' => $uid)
                 );
        }

        return true;
    }
}
