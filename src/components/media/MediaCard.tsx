// I'm sorry this is so confusing 😭

import classNames from "classnames";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { mediaItemToId } from "@/backend/metadata/tmdb";
import { DotList } from "@/components/text/DotList";
import { MediaItem } from "@/utils/mediaTypes";

import { IconPatch } from "../buttons/IconPatch";
import { Icons } from "../Icon";

export interface MediaCardProps {
  media: MediaItem;
  linkable?: boolean;
  series?: {
    episode: number;
    season?: number;
    episodeId: string;
    seasonId: string;
  };
  percentage?: number;
  closable?: boolean;
  onClose?: () => void;
}

function checkReleased(media: MediaItem): boolean {
  const isReleasedYear = Boolean(
    media.year && media.year <= new Date().getFullYear(),
  );
  const isReleasedDate = Boolean(
    media.release_date && media.release_date <= new Date(),
  );

  // If the media has a release date, use that, otherwise use the year
  const isReleased = media.release_date ? isReleasedDate : isReleasedYear;

  return isReleased;
}

function getBaseUrl(): string {
  return window.location.origin;
}

function MediaCardContent({
  media,
  linkable,
  series,
  percentage,
  closable,
  onClose,
}: MediaCardProps) {
  const { t } = useTranslation();
  const percentageString = `${Math.round(percentage ?? 0).toFixed(0)}%`;

  const isReleased = useCallback(() => checkReleased(media), [media]);
  const canLink = linkable && !closable && isReleased();
  const dotListContent = [t(`media.types.${media.type}`)];

  if (isReleased() && media.year) {
    dotListContent.push(media.year.toFixed());
  }

  if (!isReleased()) {
    dotListContent.push(t("media.unreleased"));
  }

  return (
    <div className={classNames("media-card-content")}>
      <div
        className={`group -m-3 mb-2 rounded-xl bg-background-main bg-opacity-0 transition-colors duration-100 ${
          canLink ? "hover:bg-opacity-100" : ""
        }`}
      >
        <article
          className={`pointer-events-auto relative mb-2 p-3 transition-transform duration-100 ${
            canLink ? "group-hover:scale-95" : ""
          }`}
        >
          <div
            className={[
              "relative mb-4 aspect-[2/3] w-full overflow-hidden rounded-xl bg-denim-500 bg-cover bg-center transition-[border-radius] duration-100",
              closable ? "" : "group-hover:rounded-lg",
            ].join(" ")}
            style={{
              backgroundImage: media.poster
                ? `url(${media.poster})`
                : undefined,
            }}
          >
            {series ? (
              <div
                className={[
                  "absolute right-2 top-2 rounded-md bg-denim-200 px-2 py-1 transition-colors",
                  closable ? "" : "group-hover:bg-denim-500",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-center text-xs font-bold text-slate-400 transition-colors",
                    closable ? "" : "group-hover:text-white",
                  ].join(" ")}
                >
                  {t("media.episodeDisplay", {
                    season: series.season || 1,
                    episode: series.episode,
                  })}
                </p>
              </div>
            ) : null}

            {percentage !== undefined ? (
              <>
                <div
                  className={`absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-denim-300 to-transparent transition-colors ${
                    canLink ? "group-hover:from-denim-100" : ""
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="relative h-1 overflow-hidden rounded-full bg-denim-600">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-bink-700"
                      style={{
                        width: percentageString,
                      }}
                    />
                  </div>
                </div>
              </>
            ) : null}

            <div
              className={`absolute inset-0 flex items-center justify-center bg-denim-200 bg-opacity-80 transition-opacity duration-200 ${
                closable ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <IconPatch
                clickable
                className="text-2xl text-slate-400"
                onClick={() => closable && onClose?.()}
                icon={Icons.X}
              />
            </div>
          </div>

          <h1 className="mb-1 line-clamp-3 max-h-[4.5rem] text-ellipsis break-words font-bold text-white">
            <span>{media.title}</span>
          </h1>
          <DotList className="text-xs" content={dotListContent} />
        </article>
      </div>
    </div>
  );
}

export function MediaCard(props: MediaCardProps) {
  const content = <MediaCardContent {...props} />;
  const isReleased = useCallback(
    () => checkReleased(props.media),
    [props.media],
  );
  const canLink = props.linkable && !props.closable && isReleased();

  let link = canLink
    ? `${getBaseUrl()}/media/${encodeURIComponent(mediaItemToId(props.media))}`
    : "#";
  if (canLink && props.series) {
    if (props.series.season === 0 && !props.series.episodeId) {
      link += `/${encodeURIComponent(props.series.seasonId)}`;
    } else {
      link += `/${encodeURIComponent(
        props.series.seasonId,
      )}/${encodeURIComponent(props.series.episodeId)}`;
    }
  }

  if (!canLink) return <span>{content}</span>;
  return (
    <Link
      to={link}
      className={classNames(props.closable ? "hover:cursor-default" : "")}
    >
      {content}
    </Link>
  );
}
