<?php

class Module
{
    public static function getServices(){
        $modules = Config::getSafe('disabled_modules', array());
        sort($modules);

        $idx = array_search('ivi', $modules);

        if ($idx !== false){
            array_splice($modules, $idx, 1);
        }

        // return array_map(function($module){
        //     return array('id' => $module, 'name' => $module);
        // }, $modules);
        $a = array_map(function($module){
            return array('id' => $module, 'name' => $module);
        }, $modules);

        $a[] = array(
            'id' => 'test',
            'name' => 'test'
        );

        return $a;
    }
}