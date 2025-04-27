import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import avatar from '../assets/207-2074624_white-gray-circle-avatar-png-transparent-png.png';
import { Camera, User,Mail } from 'lucide-react';
const ProfilePage: React.FC = () => {
  const {isUpdatingProfile, authUser, updateProfile} = useAuthStore();
  const [selectedImage, setSelectedImage] = useState<ArrayBuffer | string | undefined>();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64img = reader.result;
      if(base64img !== null) {
      setSelectedImage(base64img as string | ArrayBuffer);
      updateProfile({profilePic: base64img});
      }
      else{
        setSelectedImage(undefined);
      }
    }
  
  }

  console.log(authUser);

  return (
    <div className='h-fit pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h2 className='text-2xl font-semibold'>Profile</h2>
            <p className='mt-2'>Your Profile Information</p>
          </div>

          <div className='flex flex-col gap-4 items-center'>
            <div className='relative'>
              <img src = {selectedImage || authUser.profilePic || avatar} className='rounded-full size-32 object-cover border-4' alt='profile' />
              <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none': ""}`}
              >
                <Camera className='size-5 text-base-200'/>
                <input type="file" 
                id='avatar-upload'
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}/>
              </label>
            </div>
            <p className='text-sm text-zinc-400'>{isUpdatingProfile ? 'Updating...' : 'Click on the camera icon to update profile picture'}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className='size-4' />
                Fullname
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className='size-4' />
                Email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.email}</p>
            </div>
          </div>

          <div className="bg-base-300 mt-6 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split('T')[0]}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage