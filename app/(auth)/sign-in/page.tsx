'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import { Button } from './button';
import { signInSchema, signUpSchema } from '@/lib/utils';
// import { Input } from './input';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn } from '@/lib/actions/user.actions';
import PlaidLink from '@/components/ui/PlaidLink';



const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  
  const onSubmit = async (values:z.infer<typeof signInSchema>) => {    
    setIsLoading(true)
    try {
      const response = await signIn({
        email: values.email,
        password: values.password
      })

      if (response) {
        router.push("/")
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "test@gmail.com",
      password: "12345678"
    },
  })

  return (
    <section className='flex-center size-full max-sm:px-6'>
      <section className='flex-center size-full max-sm:px-6'>
      <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link 
          href="/"
          className='cursor-pointer flex items-center gap-1 px-4'
        >
          <Image
            src="/icons/logo.svg"
            alt='Logo'
            height={34}
            width={34}
          />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
              Horizon
            </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
          Sign In
            
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {
              user
                ? "Link your account to get started"
                : "Please enter your details"
            }

          </p>
        </div>
      </header>

      {
        user ? ( 
          <div className='flex flex-col gap-4'>
            {/* PAID LINK */}
            <PlaidLink user={user} variant="primary" />
          </div>
        ) : ( 
          <>
            <Form {...form}> 
                <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field}) => (
                      <div className='form-item'>
                        <FormLabel className='form-label'>
                          Email
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                          <FormControl>
                            <Input 
                              id="email"
                              placeholder='Enter your email'
                              className='input-class'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='form-message mt-2' />
                        </div>
                      </div>
                    )}
                  /> 

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field}) => (
                      <div className='form-item'>
                        <FormLabel className='form-label'>
                          Password
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                          <FormControl>
                            <Input 
                              id="password"
                              type='password'
                              placeholder='Enter your password'
                              className='input-class'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='form-message mt-2' />
                        </div>
                      </div>
                    )}
                  /> 
                  <div className="flex flex-col gap-4">
                    <Button className='form-btn' type='submit' disabled={isLoading}>
                      { 
                        isLoading ? (
                          <>
                            <Loader2 size={20} className='animate-spin' />&nbsp;
                            Loading ...
                          </>
                        ) : 'Sign In'

                      }

                    </Button>
                  </div>
              </form>
            </Form> 

            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>  
                    Don't have an account?
                </p>
                <Link className='form-link' href= "/sign-up">
                   Sign Up
                
                </Link>
            </footer>
          </>
        )
      }
       
    </section>
    </section>
    </section>
  ) 
}

export default SignIn