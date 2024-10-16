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
import { signUpSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getLoggedInUser, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const Register = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
      async function onSubmit(data:z.infer<typeof signUpSchema>) {    
       
          setIsLoading(true)
      
          try {
            const userData = {
              firstName: data.firstName!,
              lastName: data.lastName!,
              address1: data.address1!,
              city: data.city!,
              state: data.state!,
              postalCode: data.postalCode!,
              dateOfBirth: data.dateOfBirth!,
              ssn: data.ssn!,
              email: data.email,
              password: data.password
            }

            const newUser = await signUp(userData)
            setUser(newUser)
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false)
          }
        }
      
        const form = useForm<z.infer<typeof signUpSchema>>({
          resolver: zodResolver(signUpSchema),
          defaultValues: {
            email: "test@gmail.com",
            password: "12345678",
            firstName: "temitope",
            lastName: "adesiyan",
            state: "NY",
            postalCode: "23341",
            dateOfBirth: "2021-10-11",
            ssn: "343221",
            city: "NEW YORK",
            address1: "THIS IS MT ADREJ DJEDJ"
          },
        })
  
  return (
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
            {
              user
                ? "Link Account"
                : "Sign Up"
            }
            
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

                  <div className='flex gap-4 flex-col md:flex-row mt'>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            First name
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id="firstName"
                                placeholder='Enter your first name'
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
                      name="lastName"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            Last name
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id="lastName"
                                placeholder='Enter your last name'
                                className='input-class'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='form-message mt-2' />
                          </div>
                        </div>
                      )}
                    /> 

                  </div>

                  <div className="flex gap-4 flex-col md:flex-row">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            State
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id="state"
                                placeholder='Example: NY'
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
                      name="postalCode"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            Postal code
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id="postalCode"
                                placeholder='Example: 11101'
                                className='input-class'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='form-message mt-2' />
                          </div>
                        </div>
                      )}
                    /> 
                  </div>
                  

                  <div className="flex gap-4 flex-col md:flex-row">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            Date of birth
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id='dateOfBirth'
                                placeholder='Example YYYY-MM-DD'
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
                      name="ssn"
                      render={({ field}) => (
                        <div className='form-item'>
                          <FormLabel className='form-label'>
                            SSN
                          </FormLabel>
                          <div className='flex w-full flex-col'>
                            <FormControl>
                              <Input 
                                id="ssn"
                                placeholder='Enter your SSN'
                                className='input-class'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className='form-message mt-2' />
                          </div>
                        </div>
                      )}
                    /> 
                  </div>
                  
                  <div className="flex gap-4 flex-col md:flex-row">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field}) => (
                      <div className='form-item'>
                        <FormLabel className='form-label'>
                          City
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                          <FormControl>
                            <Input 
                              id="city"
                              placeholder='Enter your city'
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
                    name="address1"
                    render={({ field}) => (
                      <div className='form-item'>
                        <FormLabel className='form-label'>
                          address1
                        </FormLabel>
                        <div className='flex w-full flex-col'>
                          <FormControl>
                            <Input 
                              id="address1"
                              placeholder='Enter your address1'
                              className='input-class'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='form-message mt-2' />
                        </div>
                      </div>
                    )}
                  /> 
                  </div>

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


              
                <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Confirm Password</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              

              {/* Confirm Password Field */}
              
              

              <div className="flex flex-col gap-4">
                <Button className='form-btn' type='submit' disabled={isLoading}>
                  { 
                    isLoading ? (
                      <>
                        <Loader2 size={20} className='animate-spin' />&nbsp;
                        Loading ...
                      </>
                    ) : 'Sign up'

                  }

                </Button>
              </div>
            </form>
            </Form> 

            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                  
                    
                    Already have an account?
                
                </p>
                <Link className='form-link' href= "/sign-in">
                   Sign in
        
                </Link>
            </footer>
          </>
        )
      }
       
    </section>
    </section>
  )
}

export default Register