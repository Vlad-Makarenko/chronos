# Сhronos api

<p>This project was done as a back-end part of the full-stack project for the ucode-connect</p>

<h2>Technologies Used</h2>

<ul>
    <li>NodeJs</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>HolidayAPI</li>
</ul>
<h2>Setup</h2>

<p>Clone down this repository. You will need node and npm installed globally on your machine.
</p>
<p> 
Installation

`npm install`

To Start Server:

`npm start`

To Visit App:

`http://localhost:5000/`

</p>

<h2>Using the API</h2>
<p>
    <b>Authorization module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>POST - /api/auth/register</code></td>
                <td>Registration of a new user, required parameters are[login, password, password confirmation, email, country, language]</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/login</code></td>
                <td>Log in user, required parameters are [login, password]</td>
            </tr>
            <tr>
                <td><code>GET - /api/auth/refresh</code></td>
                <td>Refresh token</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/logout</code></td>
                <td>Log out authorized user</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset</code></td>
                <td>Send a reset link to user email, required parameter is [email]</td>
            </tr>
            <tr>
                <td><code>POST - /api/auth/password-reset/:confirm_token</code></td>
                <td>Confirm new password with a token from email, required parameter is a [new password]</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>User module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/users</code></td>
                <td>Get all users</td>
            </tr>
            <tr>
                <td><code>GET - /api/users/:user_id</code></td>
                <td>Get specified user data</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/users/</code></td>
                <td>Update profile data</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Calendar module</b>
        <table width="100%">
            <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/calendar</code></td>
                <td>Get all your calendars</td>
            </tr>
            <tr>
                <td><code>GET - /api/calendar/main</code></td>
                <td>Get your main calendar</td>
            </tr>
            <tr>
                <td><code>GET - /api/calendar/:id</code></td>
                <td>Get specified calendar data</td>
            </tr>
            <tr>
                <td><code>GET - /api/calendar/acceptInvite/:key</code></td>
                <td>Accepting the invitation and adding yourself to the invited calendar</td>
            </tr>
            <tr>
                <td><code>POST - /api/calendar</code></td>
                <td>Create a new calendar, required parameteris [name, description, isPublic]</td>
            </tr>
            <tr>
                <td><code>POST - /api/calendar/invite/:id</code></td>
                <td>send an invitation to the calendar to the selected user</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/calendar/:id</code></td>
                <td>Update the specified calendar (its name, description or visibility)</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/calendar/:id</code></td>
                <td>Delete a calendar</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/calendar/participant/:post_id</code></td>
                <td>Delete a participant from calendar</td>
            </tr>
        </table>
    </p>
    <br>
    <p><b>Event module</b>
        <table width="100%">
           <thead>
                <tr>
                    <td><b>Request</b></td>
                    <td><b>Description</b></td>
                </tr>
            </thead>
            <tr>
                <td><code>GET - /api/event/today</code></td>
                <td>Get all today events</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/calendar/:calendarId</code></td>
                <td>Get all events by calendar </td>
            </tr>
            <tr>
                <td><code>GET - /api/event/:id</code></td>
                <td>Get specified event</td>
            </tr>
            <tr>
                <td><code>GET - /api/event/acceptInvite/:key</code></td>
                <td>Accepting the invitation and adding event to your main calendar</td>
            </tr>
            <tr>
                <td><code>POST - /api/event/:calendarId</code></td>
                <td>Create a new event for chosen calendar, required parameter is [name, type, description, color, startEvent, endEvent, allDay]</td>
            </tr>
            <tr>
                <td><code>POST - /api/event/invite/:id</code></td>
                <td>send an invitation to the event to the selected user</td>
            </tr>
            <tr>
                <td><code>PATCH - /api/event/:id</code></td>
                <td>Update specified event data</td>
            </tr>
            <tr>
                <td><code>DELETE - /api/event/:id</code></td>
                <td>Delete the event</td>
            </tr>
        </table>
    </p>

<h2>Contact</h2>
<p><span style="margin-right: 30px;"></span><a href="https://github.com/Vlad-Makarenko"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a></p>
