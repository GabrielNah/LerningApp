<?php

namespace App\API;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

abstract class ApiController
{
    public function successResponse(array $data,int $statusCode=null):JsonResponse
    {
       return response()->json([...[
           'success'=>true],...$data], $statusCode??ResponseAlias::HTTP_OK);
    }

    public function errorResponse(array $data,int $statusCode=null):JsonResponse
    {
        return response()->json([...[
            'success'=>false],...$data],$statusCode??ResponseAlias::HTTP_BAD_REQUEST);
    }

    public function createdResponse(array $data):JsonResponse
    {
        return response()->json([...[
            'success'=>true],...$data], ResponseAlias::HTTP_CREATED);
    }

    public function deletedResponse():JsonResponse
    {
        return response()->json([], ResponseAlias::HTTP_NO_CONTENT);
    }
}
