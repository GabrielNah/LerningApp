<?php

namespace App\API\Controllers;

use App\API\ApiController;
use App\API\Requests\Posts\LeaveCommentRequest;
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
        $posts=Post::query()->paginate(6);
        return $this->successResponse(compact('posts'));
    }

    public function getPost($id)
    {
        $post=Post::with('comments.writer')->find($id);
        return $this->successResponse(compact('post'));
    }

    public function comment(LeaveCommentRequest $request,$id)
    {
        $post=Post::find($id);
        $comment=$post->comments()->create([
            'user_id'=>auth()->id(),
            'comment'=>$request->comment,
        ]);
        return $this->createdResponse(compact('comment'));
    }
}
