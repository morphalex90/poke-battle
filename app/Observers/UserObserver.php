<?php

namespace App\Observers;

use App\Models\Country;
use App\Models\User;
use Illuminate\Support\Str;

class UserObserver
{
    public function creating(User $user): void
    {
        $user->uuid = Str::uuid();

        if (! app()->environment('local') && request()->headers->has('CF-IPCountry')) {
            $country = Country::where('code', request()->header('CF-IPCountry'))->first();
            if ($country != null) {
                $user->country_id = $country->id;
            }
        }
    }
}
