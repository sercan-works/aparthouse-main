"use client";
import { Input, Textarea } from "@heroui/input";
import { Button, Checkbox } from "@heroui/react";
import React from "react";

const ContactForm = () => {
  return (
    <div>
      <form>
        <div className="flex flex-col gap-8">
          <Input label="Ad soyad" type="name" variant="underlined" />
          <Input label="Email" type="email" variant="underlined" />
          <Input label="Telefon" type="tel" variant="underlined" />
          <Textarea
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-lg",
              input: "resize-y min-h-[40px]"
            }}
            label="Mesaj"
            placeholder="Mesajınızı giriniz"
            variant="bordered"
          />
          <Checkbox  color="default">
        Kvkk metni okudum ve kabul ediyorum.
      </Checkbox>
          <Button type="submit" variant="solid" className="w-full bg-colorFirst text-white font-bold">
            Gönder
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
