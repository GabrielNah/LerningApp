<?php

namespace App\Traits;

trait HasFileExistsChecking
{
    private function fileExists(string $file,string $name):?string
    {

        if (file_exists($file)){
            return null;
        }
        [$dir,$fileName]=explode('\\',$name);
        return $dir;
    }
}
