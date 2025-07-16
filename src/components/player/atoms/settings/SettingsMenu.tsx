import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getCachedMetadata } from "@/backend/helpers/providerApi";
import { Toggle } from "@/components/buttons/Toggle";
import { Icon, Icons } from "@/components/Icon";
import { useCaptions } from "@/components/player/hooks/useCaptions";
import { Menu } from "@/components/player/internals/ContextMenu";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";
import { useLanguageStore } from "@/stores/language";
import { usePlayerStore } from "@/stores/player/store";
import { qualityToString } from "@/stores/player/utils/qualities";
import { useSubtitleStore } from "@/stores/subtitles";
import { useThemeStore } from "@/stores/theme";
import { getPrettyLanguageNameFromLocale } from "@/utils/language";

export function SettingsMenu({ id }: { id: string }) {
  const { t } = useTranslation();
  const router = useOverlayRouter(id);
  const currentQuality = usePlayerStore((s) => s.currentQuality);
  const currentAudioTrack = usePlayerStore((s) => s.currentAudioTrack);
  const selectedCaptionLanguage = usePlayerStore(
    (s) => s.caption.selected?.language,
  );
  const subtitlesEnabled = useSubtitleStore((s) => s.enabled);
  const currentSourceId = usePlayerStore((s) => s.sourceId);
  const sourceName = useMemo(() => {
    if (!currentSourceId) return "...";
    const source = getCachedMetadata().find(
      (src) => src.id === currentSourceId,
    );
    return source?.name ?? "...";
  }, [currentSourceId]);
  const { toggleLastUsed } = useCaptions();
  const activeTheme = useThemeStore((s) => s.theme);
  const themeName = useMemo(() => {
    return t(`settings.appearance.themes.${activeTheme || "default"}`);
  }, [t, activeTheme]);
  const language = useLanguageStore((s) => s.language);
  const languageName = useMemo(() => {
    return getPrettyLanguageNameFromLocale(language) ?? language;
  }, [language]);

  const selectedLanguagePretty = selectedCaptionLanguage
    ? (getPrettyLanguageNameFromLocale(selectedCaptionLanguage) ??
      t("player.menus.subtitles.unknownLanguage"))
    : undefined;

  const selectedAudioLanguagePretty = currentAudioTrack
    ? (getPrettyLanguageNameFromLocale(currentAudioTrack.language) ??
      currentAudioTrack.label ??
      t("player.menus.subtitles.unknownLanguage"))
    : undefined;

  const source = usePlayerStore((s) => s.source);

  const downloadable = source?.type === "file" || source?.type === "hls";

  return (
    <Menu.Card>
      <Menu.Section grid>
        <Menu.ChevronLink
          box
          onClick={() => router.navigate("/quality")}
          rightText={currentQuality ? qualityToString(currentQuality) : ""}
        >
          {t("player.menus.settings.qualityItem")}
          <span className="text-type-secondary text-sm">
            {currentQuality
              ? qualityToString(currentQuality)
              : t("player.menus.quality.auto")}
          </span>
        </Menu.ChevronLink>
        <Menu.ChevronLink
          box
          onClick={() => router.navigate("/source")}
          rightText={sourceName}
        >
          {t("player.menus.settings.sourceItem")}
          <span className="text-type-secondary text-sm">{sourceName}</span>
        </Menu.ChevronLink>
        <Menu.ChevronLink
          box
          onClick={() => router.navigate("/captions")}
          rightText={sourceName}
        >
          {t("player.menus.settings.subtitleItem")}
          <span className="text-type-secondary text-sm">
            {selectedLanguagePretty ?? t("player.menus.subtitles.offChoice")}
          </span>
        </Menu.ChevronLink>
        {currentAudioTrack ? (
          <Menu.ChevronLink
            box
            onClick={() => router.navigate("/audio")}
            rightText={selectedAudioLanguagePretty ?? undefined}
          >
            {t("player.menus.settings.audioItem")}
            <span className="text-type-secondary text-sm">
              {selectedAudioLanguagePretty}
            </span>
          </Menu.ChevronLink>
        ) : (
          <Menu.ChevronLink
            box
            onClick={() => router.navigate("/audio")}
            disabled
          >
            {t("player.menus.settings.audioItem")}
            <span className="text-type-secondary text-sm">
              {t("player.menus.audio.default")}
            </span>
          </Menu.ChevronLink>
        )}
      </Menu.Section>
      <Menu.Section>
        {new URLSearchParams(window.location.search).get("downloads") !==
          "false" && (
          <Menu.Link
            clickable
            onClick={() =>
              router.navigate(downloadable ? "/download" : "/download/unable")
            }
            rightSide={<Icon className="text-xl" icon={Icons.DOWNLOAD} />}
            className={downloadable ? "opacity-100" : "opacity-50"}
          >
            {t("player.menus.settings.downloadItem")}
          </Menu.Link>
        )}
        {new URLSearchParams(window.location.search).get("has-watchparty") !==
          "false" && (
          <Menu.Link
            clickable
            onClick={() =>
              router.navigate(downloadable ? "/watchparty" : "/download/unable")
            }
            rightSide={<Icon className="text-xl" icon={Icons.WATCH_PARTY} />}
            className={downloadable ? "opacity-100" : "opacity-50"}
          >
            {t("player.menus.watchparty.watchpartyItem")}
          </Menu.Link>
        )}
      </Menu.Section>
      <Menu.SectionTitle />
      <Menu.Section>
        <Menu.Link
          rightSide={
            <Toggle
              enabled={subtitlesEnabled}
              onClick={() => toggleLastUsed().catch(() => {})}
            />
          }
        >
          {t("player.menus.settings.enableSubtitles")}
        </Menu.Link>
        <Menu.ChevronLink onClick={() => router.navigate("/playback")}>
          {t("player.menus.settings.playbackItem")}
        </Menu.ChevronLink>
        {new URLSearchParams(window.location.search).get(
          "interface-settings",
        ) !== "false" && (
          <>
            <Menu.ChevronLink
              onClick={() => router.navigate("/theme")}
              rightText={themeName}
            >
              {t("settings.appearance.title")}
            </Menu.ChevronLink>
            <Menu.ChevronLink
              onClick={() => router.navigate("/language")}
              rightText={languageName}
            >
              {t("settings.preferences.language")}
            </Menu.ChevronLink>
          </>
        )}
      </Menu.Section>
    </Menu.Card>
  );
}
