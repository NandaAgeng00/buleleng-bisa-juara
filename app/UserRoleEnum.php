<?php

namespace App;

enum UserRoleEnum: string
{
    case SuperAdmin = 'super-admin';
    case Admin = 'admin';
    case Athlete = 'athlete';
    case Coach = 'coach';
    case Manager = 'manager';
    case Official = 'official';
    case Guest = 'guest';
}
