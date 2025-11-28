import { supabase } from './supabase';
import { notFound } from 'next/navigation';


export async function getProfiles(email) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
}

export async function createProfile(newProfile) {
  const { data, error } = await supabase.from('profiles').insert([newProfile]);

  if (error) {
    console.error(error);
    throw new Error('profile could not be created');
  }

  return data;
}