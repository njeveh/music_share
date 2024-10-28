<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Notifications\EmailVerification;
use App\Notifications\UserRegistered as UserRegisteredNotification;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendEmailVerificationCode
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        // Log::info($event->user->last_name);
        $event->user->notify(new EmailVerification($event->user));
        // Mail::to($event->user->email)->send(new MailUserRegistered($event->user));
    }
}
