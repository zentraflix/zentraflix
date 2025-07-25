import { useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { genMnemonic } from "@/backend/accounts/crypto";
import { Button } from "@/components/buttons/Button";
import { PassphraseDisplay } from "@/components/form/PassphraseDisplay";
import { Icon, Icons } from "@/components/Icon";
import {
  LargeCard,
  LargeCardButtons,
  LargeCardText,
} from "@/components/layout/LargeCard";

interface PassphraseGeneratePartProps {
  onNext?: (mnemonic: string) => void;
}

export function PassphraseGeneratePart(props: PassphraseGeneratePartProps) {
  const [mnemonic, setMnemonic] = useState(() => genMnemonic());
  const { t } = useTranslation();

  const handleCustomPassphrase = useCallback((customPassphrase: string) => {
    setMnemonic(customPassphrase);
  }, []);

  return (
    <LargeCard>
      <LargeCardText
        title={t("auth.generate.title")}
        icon={<Icon icon={Icons.USER} />}
      >
        <Trans
          i18nKey="auth.generate.description"
          components={{
            bold: <span className="font-bold" style={{ color: "#cfcfcf" }} />,
          }}
        />
      </LargeCardText>
      <PassphraseDisplay
        mnemonic={mnemonic}
        onCustomPassphrase={handleCustomPassphrase}
      />

      <LargeCardButtons>
        <Button theme="purple" onClick={() => props.onNext?.(mnemonic)}>
          {t("auth.generate.next")}
        </Button>
      </LargeCardButtons>
    </LargeCard>
  );
}
