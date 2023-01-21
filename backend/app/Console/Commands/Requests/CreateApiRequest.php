<?php

namespace App\Console\Commands\Requests;

use Illuminate\Console\Command;

class CreateApiRequest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:request {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create request for validating request to API';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sub=file_get_contents(__DIR__.'\request.sub');
        $name=$this->argument('name');
        $file='app\API\Requests\\'.$name.'.php';
        touch($file);
        $content=sprintf($sub,$name);
        file_put_contents($file,$content);
        return Command::SUCCESS;
    }
}
