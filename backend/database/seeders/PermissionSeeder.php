<?php

namespace Database\Seeders;

use App\Models\Permissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data=[
            ['name'=>'create-admin'],
            ['name'=>'update-user-name'],
            ['name'=>'update-user-lastname'],
            ['name'=>'update-user-email'],
            ['name'=>'update-user-password'],
            ['name'=>'create-user'],
            ['name'=>'remove-user'],
            ['name'=>'create-admin'],
            ['name'=>'self-remove'],
        ];
        Permissions::insert($data);
    }
}
