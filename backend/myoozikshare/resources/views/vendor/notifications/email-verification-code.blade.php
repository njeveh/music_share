<x-mail::message>
    {{-- Greeting --}}
    # {{ $greeting }}


    Below is your email address verification code.<br/>
    <x-mail::panel>
        {{ $email_verification_code }}
    </x-mail::panel>



    @lang('Regards,')<br>
    {{ config('app.name') }}
</x-mail::message>

