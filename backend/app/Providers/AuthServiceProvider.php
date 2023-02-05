<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Admin;
use Illuminate\Auth\Access\Response;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('view-user-profile', function (Authenticatable $user,int $friend_id) {
            if ($user->canViewProfile($friend_id)){
                return true;
            }
            return Response::deny('You are not authorize to view this page');
        });
        Gate::define('view-all-users',function (Authenticatable $user){
            if ($user instanceof Admin){
                return true;
            }
            return Response::deny('You are not authorize to gel all profiles  related data');
        });
    }
}
