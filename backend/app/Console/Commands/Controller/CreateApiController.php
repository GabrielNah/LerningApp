<?php

namespace App\Console\Commands\Controller;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use function info;

class CreateApiController extends Command
{
    private string $pathToSub=__DIR__.'\api-controller.sub';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:controller {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create controller which extends api controller and located in API folder';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sub=file_get_contents(__DIR__.'\api-controller.sub');
        $name=$this->argument('name');
        $file='app\API\Controllers\\'.$name.'.php';
        touch($file);
        $content=sprintf($sub,$name);
        file_put_contents($file,$content);
        return Command::SUCCESS;
    }
}
