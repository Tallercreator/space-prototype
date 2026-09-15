import { Button } from "@otp/space-ui-kit/button";
import { Popup, PopupActionPanel, PopupContent, PopupHeader } from "@otp/space-ui-kit/popup";

/** Подтверждение отклонения — необратимое действие. */
export function DeclinePopup({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Popup open={open} onClose={onClose}>
      <PopupContent>
        <PopupHeader
          type="title"
          title="Отклонить предложение?"
          description="Это действие нельзя отменить. Если хочешь обсудить условия — сначала напиши рекрутеру."
          showCloseButton
          closeLabel="Закрыть"
        />
        <PopupActionPanel>
          <Button variant="secondary" tone="neutral" size="large" onClick={onClose}>
            Вернуться
          </Button>
          <Button tone="red" size="large" onClick={onConfirm}>
            Отклонить оффер
          </Button>
        </PopupActionPanel>
      </PopupContent>
    </Popup>
  );
}

/** Заглушка анкеты парковки (в прототипе не проектируется). */
export function ParkingPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Popup open={open} onClose={onClose}>
      <PopupContent>
        <PopupHeader
          type="title"
          title="Данные для парковки"
          description="Здесь откроется анкета: номер и марка машины. Дата выхода уже подтверждена и не редактируется."
          showCloseButton
          closeLabel="Закрыть"
        />
        <PopupActionPanel>
          <Button tone="neutral" size="large" onClick={onClose}>
            Понятно
          </Button>
        </PopupActionPanel>
      </PopupContent>
    </Popup>
  );
}
