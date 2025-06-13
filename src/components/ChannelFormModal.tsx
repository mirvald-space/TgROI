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
          <div className="p-3 mb-4 border rounded bg-slate-50">
            <h3 className="font-medium mb-2">Как оценивается эффективность?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Эффективность — это комплексный показатель, учитывающий стоимость охвата аудитории (CPM) 
              и привлечения новых подписчиков. <span className="font-medium">Чем ниже значение, тем лучше.</span>
            </p>
            
            <div className="bg-white p-3 rounded border">
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
            
            <div className="mt-2 text-xs text-gray-500">
              <p className="mb-1">Интерпретация показателя:</p>
              <div className="flex justify-between gap-2">
                <span><span className="inline-block w-3 h-3 rounded bg-green-400"></span> &lt;0.8: Отлично</span>
                <span><span className="inline-block w-3 h-3 rounded bg-yellow-300"></span> 0.8-1.2: Нормально</span>
                <span><span className="inline-block w-3 h-3 rounded bg-red-400"></span> &gt;1.2: Низко</span>
              </div>
            </div>
          </div>
          <ChannelForm onSubmitSuccess={handleFormSuccess} />
        </DialogContent>
      )}
    </Dialog>
  );
} 