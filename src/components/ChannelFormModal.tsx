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
import { HelpCircle, PlusCircle } from "lucide-react";

export default function ChannelFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleHelpOpenChange = (open: boolean) => {
    setIsHelpOpen(open);
  };

  const handleFormSuccess = () => {
    // Небольшая задержка перед закрытием, чтобы пользователь увидел успешное добавление
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="flex items-center gap-1">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Добавить канал</span>
        </Button>
        {isOpen && (
          <DialogContent 
            className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto"
            onInteractOutside={(e) => e.preventDefault()}
          >
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
      
      <Dialog open={isHelpOpen} onOpenChange={handleHelpOpenChange}>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsHelpOpen(true)} 
          className="rounded-full w-6 h-6 p-0"
          aria-label="Информация об эффективности"
        >
          <HelpCircle className="h-3 w-3" />
        </Button>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Как оценивается эффективность?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Эффективность — это комплексный показатель, учитывающий стоимость охвата аудитории (CPM) 
              и привлечения новых подписчиков. <span className="font-medium">Чем ниже значение, тем лучше.</span>
            </p>
            
            <div className="bg-slate-50 p-3 rounded border">
              <div className="text-lg font-semibold mb-1">
                <span className="text-gray-800">ниже рынка</span>{" "}
                <span className="text-rose-500">на 30.0%</span>
              </div>
              <div className="text-gray-500 text-sm">эффективность</div>
              <div className="text-xl font-semibold mb-3">~ 0.70</div>
              
              <div className="relative h-3 w-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 rounded-full overflow-hidden mb-3">
                <div className="absolute top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-700" style={{ left: '50%' }}></div>
                <div className="absolute top-0 bottom-0 w-1 bg-black" style={{ left: '35%' }}></div>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                в среднем
                <div className="font-semibold text-lg">1.00</div>
              </div>
            </div>
            
            <div className="mt-2 text-gray-600">
              <p className="mb-2">Интерпретация показателя:</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-green-400"></span>
                  <span>&lt;0.8: Отличная эффективность (значительно лучше среднего)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-yellow-300"></span>
                  <span>0.8-1.2: Нормальная эффективность (на уровне рынка)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded bg-red-400"></span>
                  <span>&gt;1.2: Низкая эффективность (хуже среднего)</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 