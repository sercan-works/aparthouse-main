"use client";

import React, { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  Button
} from "@heroui/react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaLink } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

interface ShareModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  url: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onOpenChange, 
  url = window.location.href,
  title = "ApartHouse - Apart Detayı" 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShareLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinks = [
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp className="w-6 h-6 text-green-500" />, 
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
      color: "bg-green-100"
    },
    { 
      name: "Facebook", 
      icon: <FaFacebook className="w-6 h-6 text-blue-600" />, 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "bg-blue-100"
    },
    { 
      name: "Twitter", 
      icon: <FaTwitter className="w-6 h-6 text-blue-400" />, 
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: "bg-blue-50"
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin className="w-6 h-6 text-blue-700" />, 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "bg-blue-50"
    }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      classNames={{
        base: "max-w-md mx-auto",
      }}
      closeButton={<MdClose className="w-6 h-6" />}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center">
              <div className="text-xl font-bold">Paylaş</div>
              <Button isIconOnly variant="light" onPress={onClose}>
                <MdClose className="w-6 h-6" />
              </Button>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col space-y-4">
                {/* URL Preview */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="font-medium truncate">{title}</div>
                  <div className="text-sm text-gray-500 truncate">{url}</div>
                </div>
                
                {/* Copy Link Button */}
                <Button
                  className="w-full h-12 border-2 border-colorFirst text-gray-700 gap-2"
                  variant="bordered"
                  onPress={handleCopyLink}
                >
                  <FaLink className="w-5 h-5 text-colorFirst" />
                  {copied ? "Kopyalandı!" : "Bağlantıyı Kopyala"}
                </Button>
                
                {/* Share Options */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {shareLinks.map((link) => (
                    <Button 
                      key={link.name}
                      onPress={() => openShareLink(link.url)}
                      className={`flex items-center gap-2 p-3 rounded-lg ${link.color} hover:opacity-90 transition-opacity`}
                      variant="flat"
                      startContent={link.icon}
                    >
                      {link.name}
                    </Button>
                  ))}
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareModal; 