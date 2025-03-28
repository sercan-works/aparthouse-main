"use client";
import { useSession } from "next-auth/react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/api/authApi";
import { useAppSelector } from "@/store/hooks";
import { Card, Button, Avatar, Input, Spinner } from "@heroui/react";
import { FaUser, FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, refetch } = useGetProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        username: user.username || ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Profil güncellenirken hata oluştu:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const profilePicture = session?.user?.image || 'https://via.placeholder.com/150';

  return (
    <div className="container mx-auto px-4 py-8 mb-10">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Profil Bilgilerim</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sol Kolon - Profil Resmi ve Kısa Bilgiler */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <Avatar 
                src={profilePicture} 
                alt="Profil Resmi"
                className="w-32 h-32 mb-4 rounded-full"
              />
              <h2 className="text-xl font-semibold">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-gray-600 mt-1">{user?.email}</p>
              
              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser size={18} />
                  <span>Kullanıcı Adı: {user?.username}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaEnvelope size={18} />
                  <span>E-posta: {user?.email}</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="mt-6 w-full"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FaPencilAlt size={16} className="mr-2" />
                Profili Düzenle
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Sağ Kolon - Profil Detayları ve Düzenleme Formu */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Profil Bilgilerini Düzenle</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ad
                    </label>
                    <Input
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Soyad
                    </label>
                    <Input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kullanıcı Adı
                  </label>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button
                    variant="ghost"
                    type="button"
                    // onClick={() => setIsEditing(false)}
                  >
                    İptal
                  </Button>
                  <Button
                    variant="solid"
                    type="submit"
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Spinner size="sm" className="mr-2" /> : null}
                    Kaydet
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profil Bilgileri</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Ad</h3>
                    <p className="mt-1">{user?.first_name || '-'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Soyad</h3>
                    <p className="mt-1">{user?.last_name || '-'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Kullanıcı Adı</h3>
                    <p className="mt-1">{user?.username}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">E-posta</h3>
                    <p className="mt-1">{user?.email}</p>
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <h3 className="text-sm font-medium text-gray-500">Yetki</h3>
                    <p className="mt-1">{user?.is_staff ? 'Yönetici' : 'Kullanıcı'}</p>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="mt-6"
                //   onClick={() => setIsEditing(true)}
                >
                  <FaPencilAlt size={16} className="mr-2" />
                  Profili Düzenle
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;