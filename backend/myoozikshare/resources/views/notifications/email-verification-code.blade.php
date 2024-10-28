<x-mail::message>
    {{-- Greeting --}}
    # {{ 'Hello ' . $user->first_name }}

        # {{ $user->email_verification_code }}




    @lang('Regards,')<br>
    {{ config('app.name') }}
</x-mail::message>

