import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChannelForm from "./ChannelForm";

export default function ChannelFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleFormSuccess = () => {
    // Небольшая задержка перед закрытием, чтобы пользователь увидел успешное добавление
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <Button variant="default" onClick={() => setIsOpen(true)}>
        Добавить канал
      </Button>
      {isOpen && (
        <DialogContent className="sm:max-w-[500px]" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Добавить новый канал</DialogTitle>
            <DialogDescription>
              Введите данные канала для оценки эффективности рекламы
            </DialogDescription>
          </DialogHeader>
          <ChannelForm onSubmitSuccess={handleFormSuccess} />
        </DialogContent>
      )}
    </Dialog>
  );
} 