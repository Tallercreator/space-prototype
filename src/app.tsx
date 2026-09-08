import * as React from "react";

import { Badge } from "@otp/space-ui-kit/badge";
import { Button } from "@otp/space-ui-kit/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@otp/space-ui-kit/card";
import { IconButton } from "@otp/space-ui-kit/icon-button";
import { ArrowRightLine24Icon } from "@otp/space-ui-kit/icons/arrow-right-line-24";
import { Input } from "@otp/space-ui-kit/input";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@otp/space-ui-kit/tabs";
import { Typography } from "@otp/space-ui-kit/typography";

/**
 * Стартовый экран-заглушка. Заменяется на реальный прототип:
 * компоненты импортируются из `@otp/space-ui-kit/<имя>`, стили —
 * только через токен-утилиты (gap-spacing-*, p-spacing-*, bg-base-*).
 */
export function App() {
  const [tab, setTab] = React.useState<string>("one");

  return (
    <main className="min-h-screen bg-base-surface-primary-background p-spacing-xl font-primary">
      <div className="shell mx-auto grid gap-spacing-lg">
        <header className="grid gap-spacing-xs">
          <Typography.Heading.TwoSB>Прототип на Space UI Kit</Typography.Heading.TwoSB>
          <Typography.Body.ThreeR color="secondary">
            Отдельный проект: кит подключён как пакет, наружу уходит только билд.
          </Typography.Body.ThreeR>
        </header>

        <Tabs value={tab} onValueChange={(value) => setTab(String(value))}>
          <TabsList>
            <TabsTab value="one">Первый</TabsTab>
            <TabsTab value="two">Второй</TabsTab>
          </TabsList>
          <TabsPanel value="one">
            <Card>
              <CardHeader>
                <CardTitle>Карточка</CardTitle>
                <CardDescription>Здесь будет содержимое первого экрана.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-spacing-md">
                <Input placeholder="Введите значение" />
                <div className="flex items-center gap-spacing-sm">
                  <Button type="button">Продолжить</Button>
                  <IconButton aria-label="Далее" type="button">
                    <ArrowRightLine24Icon aria-hidden="true" />
                  </IconButton>
                  <Badge tone="primary">3</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsPanel>
          <TabsPanel value="two">
            <Card surface="background">
              <CardHeader>
                <CardTitle>Второй экран</CardTitle>
                <CardDescription>Контрастная подложка карточки.</CardDescription>
              </CardHeader>
            </Card>
          </TabsPanel>
        </Tabs>
      </div>
    </main>
  );
}
