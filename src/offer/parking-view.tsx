import * as React from "react";
import { Button } from "@otp/space-ui-kit/button";
import { IconButton } from "@otp/space-ui-kit/icon-button";
import { InfoLine16Icon } from "@otp/space-ui-kit/icons/info-line-16";
import { Upload } from "@otp/space-ui-kit/upload";
import { SelectDate } from "@otp/space-ui-kit/select-date";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@otp/space-ui-kit/tooltip";
import { Typography } from "@otp/space-ui-kit/typography";

const DOCUMENT_HINT = "Необходимо вложить скан/фото СТС (Свидетельство о регистрации транспортного средства) и страховку (ОСАГО/КАСКО) для оформления паркинг-места.";

function Hint({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = React.useState(false);
  const triggerId = React.useId();
  return (
    <Tooltip open={open} onOpenChange={setOpen} triggerId={triggerId}>
      <TooltipTrigger id={triggerId} delay={150} closeOnClick={false} onClick={() => setOpen(true)} render={<IconButton variant="ghost" tone="neutral" size="xsmall" aria-label={label} />}>
        <InfoLine16Icon aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent type="paragraph">{text}</TooltipContent>
    </Tooltip>
  );
}

/** Демонстрационная форма: файлы остаются в памяти вкладки. */
export function ParkingView() {
  const [files, setFiles] = React.useState<Partial<Record<"sts" | "osago", File>>>({});
  const [errors, setErrors] = React.useState<Partial<Record<"sts" | "osago" | "date", string>>>({});
  const [date, setDate] = React.useState<Date>();
  const [sent, setSent] = React.useState(false);
  const docs = [{ id: "sts" as const, title: "Вложи СТС" }, { id: "osago" as const, title: "Вложи ОСАГО" }];
  function select(id: "sts" | "osago", picked: File[]) {
    const file = picked[0];
    if (!file) return;
    const error = !/\.(pdf|png|jpe?g)$/i.test(file.name) ? "Выбери PDF, JPG или PNG" : file.size > 10 * 1024 * 1024 ? "Файл должен быть не больше 10 МБ" : undefined;
    setErrors(e => ({ ...e, [id]: error }));
    if (!error) setFiles(f => ({ ...f, [id]: file }));
  }
  function submit() {
    const next = { sts: files.sts ? undefined : "Приложи СТС", osago: files.osago ? undefined : "Приложи ОСАГО", date: date ? undefined : "Укажи дату выхода на работу" };
    setErrors(next);
    if (files.sts && files.osago && date) setSent(true);
  }
  return <TooltipProvider><section className="offer-parking flex flex-col gap-spacing-xxxl" aria-labelledby="parking-title">
    <div className="grid gap-spacing-md"><Typography.Title.OneM as="h2" id="parking-title" className="m-0">Данные для парковки</Typography.Title.OneM><Typography.Body.ThreeR color="secondary">Приложи документы на автомобиль и укажи дату выхода, согласованную с рекрутером.</Typography.Body.ThreeR></div>
    {sent ? <div role="status" className="grid gap-spacing-md"><Typography.Title.TwoM>Данные для парковки заполнены</Typography.Title.TwoM><Typography.Body.ThreeR color="secondary">Это прототип: документы никуда не отправлялись.</Typography.Body.ThreeR><Button variant="secondary" tone="neutral" onClick={() => setSent(false)}>Вернуться к данным</Button></div> : <>
    {docs.map(doc => <div key={doc.id} className="grid gap-spacing-md">
      <div className="flex items-center gap-spacing-md"><Typography.Body.TwoM>{doc.title}</Typography.Body.TwoM><Hint text={DOCUMENT_HINT} label={`Подсказка: ${doc.title}`} /></div>
      <Upload aria-label={doc.title} labelIcon={false} accept=".pdf,.jpg,.jpeg,.png" hint="PDF, JPG или PNG · до 10 МБ" error={errors[doc.id]} onFilesSelected={picked => select(doc.id, picked)} />
      {files[doc.id] ? <div className="flex items-center justify-between gap-spacing-md"><Typography.Body.ThreeR>{files[doc.id]!.name}</Typography.Body.ThreeR><Button size="small" variant="secondary" tone="neutral" onClick={() => setFiles(f => ({ ...f, [doc.id]: undefined }))}>Удалить</Button></div> : null}
    </div>)}
    <div className="grid gap-spacing-md"><div className="flex items-center gap-spacing-md"><Typography.Body.TwoM>Дата выхода на работу</Typography.Body.TwoM><Hint label="Подсказка: дата выхода на работу" text="Выбери дату, которую согласовал с рекрутером. Она нужна для оформления доступа на парковку." /></div><SelectDate label="Дата выхода на работу" value={date} onValueChange={d => { setDate(d); setErrors(e => ({ ...e, date: undefined })); }} invalid={Boolean(errors.date)} />{errors.date ? <Typography.Caption.OneR color="redError" role="alert">{errors.date}</Typography.Caption.OneR> : null}</div>
    <div className="offer-parking__actions bg-base-surface-primary-block-normal">
    <Button className="offer-parking__submit" tone="neutral" size="large" onClick={submit}>Сформировать заявку на пропуск</Button>
    </div>
    </>}
  </section></TooltipProvider>;
}
