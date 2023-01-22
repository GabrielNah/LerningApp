<?php

namespace App\API\Controllers;

use App\API\ApiController;
use App\API\Requests\Posts\MakePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController  extends ApiController
{
    public function store(MakePostRequest $request)
    {
        try {
            $file=$request->file('image');
            $filepath=Storage::disk('customers')->putFile('posts'.auth()->id(),$file);
            Post::create([
                'user_id'=>auth()->id(),
                'article'=>$request->post,
                'title'=>$request->title,
                'image'=>$filepath,
            ]);
            return $this->successResponse([]);
        }catch (\Throwable $e){
            info($e);
            return $this->errorResponse([]);
        }

    }

    public function index()
    {
        $posts=Post::query()->paginate(2);
        return $this->successResponse(compact('posts'));
    }

}
