<x-mail::message>
# {{ 'Hello ' . $user->first_name . ',' }}

Here is your email address verification code. This code will be invalid after 6 hours.

<table class="action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
        <td align="center">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="center">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td>
                                    <p style="font-weight: bold; font-family: 'Courier New', Courier, monospace; font-size: 25px;">
                                        {{ $code->code }}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
If you did not create an account on our platform please just ignore this mail.<br><br>

Regards,<br>
{{ config('app.name') }}
</x-mail::message>
