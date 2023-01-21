<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'email'=>'admin@admin.com',
            'password'=>bcrypt('admin@admin.com'),
            'name'=>'Admin',
            'lastname'=>'Supervisor',
            'avatar'=>'/images/admin.jpg'
        ]);
    }
}
