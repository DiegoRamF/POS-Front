import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { SupabaseClient, Session } from '@supabase/supabase-js';

import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

}
