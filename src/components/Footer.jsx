import React from 'react'

import facebook_icon from '../assets/icons/facebook_icon.png'
import instagram_icon from '../assets/icons/instagram_icon.png'
import twitter_icon from '../assets/icons/twitter_icon.png'
import youtube_icon from '../assets/icons/youtube_icon.png'

const Footer = () => {
    return (
        <footer className='flex flex-col px-5 pt-2 w-full'>
            <div className='border-t border-b border-white flex flex-col pt-4 gap-8'>
                <p className='hover:underline hover:underline-offset-2 cursor-pointer px-8 sm:px-10 md:px-20'>Questions? Call 000-800-919-1694</p>
                <div className='flex flex-col gap-2 md:flex-row justify-between px-8 sm:px-10 md:px-20 pb-8'>
                    <ul className='flex flex-col gap-2'>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>FAQ</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Media Center</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Buy Gift Cards</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Cookie Preferences</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Legal Notices</li>
                    </ul>
                    <ul className='flex flex-col gap-2'>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Gift Card Terms</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Investor Relations</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Ways to Watch</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Corporate Information</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Only on Netflix</li>
                    </ul>
                    <ul className='flex flex-col gap-2'>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Help Center</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Jobs</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Terms of Use</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Contact Us</li>
                    </ul>
                    <ul className='flex flex-col gap-2'>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Account</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Redeem Gift Cards</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Privacy</li>
                        <li className='hover:underline hover:underline-offset-2 cursor-pointer'>Speed Test</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col gap-4 md:flex-row items-center text-center md:justify-between px-4 py-4'>
                <p>© {new Date().getFullYear()} Netflix, Inc.</p>
                <div className='flex  gap-2.5'>
                    <a href='https://facebook.com' target='_blank'>
                        <img
                            src={facebook_icon}
                            alt=''
                            className='h-7 cursor-pointer'
                        />
                    </a>

                    <a href='https://instagram.com' target='_blank'>
                        <img
                            src={instagram_icon}
                            alt=''
                            className='h-7 cursor-pointer'
                        />
                    </a>

                    <a href='https://twitter.com' target='_blank'>
                        <img
                            src={twitter_icon}
                            alt=''
                            className='h-7 cursor-pointer'
                        />
                    </a>

                    <a href='https://youtube.com' target='_blank'>
                        <img
                            src={youtube_icon}
                            alt=''
                            className='h-7 cursor-pointer'
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer