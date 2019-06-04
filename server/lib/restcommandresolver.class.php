<?php

class RESTCommandResolver
{

    public function __construct(){}

    /**
     * @throws RESTCommandResolverException
     * @param RESTRequest $request
     * @return RESTCommand
     */
    public function getCommand(RESTRequest $request){

        $resource = implode("", array_map(function($part){
            return ucfirst($part);
        },explode('_', $request->getResource())));

        $class = 'RESTCommand'.ucfirst($resource);

        if (!class_exists($class)){
            throw new RESTCommandResolverException('Resource "'.$resource.'" does not exist');
        }

        return new $class;
    }
}

class RESTCommandResolverException extends Exception {}

?>