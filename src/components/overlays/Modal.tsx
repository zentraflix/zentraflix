import classNames from "classnames";
import { ReactNode, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { OverlayPortal } from "@/components/overlays/OverlayDisplay";
import { Flare } from "@/components/utils/Flare";
import { Heading2 } from "@/components/utils/Text";
import { useQueryParam } from "@/hooks/useQueryParams";

export function useModal(id: string) {
  const [currentModal, setCurrentModal] = useQueryParam("m");
  const show = useCallback(() => setCurrentModal(id), [id, setCurrentModal]);
  const hide = useCallback(() => setCurrentModal(null), [setCurrentModal]);
  return {
    id,
    isShown: currentModal === id,
    show,
    hide,
  };
}

export function ModalCard(props: { children?: ReactNode }) {
  return (
    <div className="w-full max-w-[30rem] m-4">
      <div className="w-full bg-modal-background rounded-xl p-8 pointer-events-auto">
        {props.children}
      </div>
    </div>
  );
}

export function Modal(props: { id: string; children?: ReactNode }) {
  const modal = useModal(props.id);

  return (
    <OverlayPortal darken close={modal.hide} show={modal.isShown}>
      <Helmet>
        <html data-no-scroll />
      </Helmet>
      <div className="flex absolute inset-0 items-center justify-center flex-col">
        {props.children}
      </div>
    </OverlayPortal>
  );
}

export function FancyModal(props: {
  id: string;
  children?: ReactNode;
  title?: string;
  size?: "md" | "xl";
  oneTime?: boolean;
}) {
  const modal = useModal(props.id);

  useEffect(() => {
    if (props.oneTime) {
      const isDismissed = localStorage.getItem(`modal-${props.id}-dismissed`);
      if (!isDismissed) {
        modal.show();
      }
    }
  }, [modal, props.id, props.oneTime]);

  const handleClose = () => {
    if (props.oneTime) {
      localStorage.setItem(`modal-${props.id}-dismissed`, "true");
    }
    modal.hide();
  };

  return (
    <OverlayPortal darken close={handleClose} show={modal.isShown}>
      <Helmet>
        <html data-no-scroll />
      </Helmet>
      <div className="flex absolute inset-0 items-center justify-center">
        <Flare.Base
          className={classNames(
            "group -m-[0.705em] rounded-3xl bg-background-main transition-colors duration-300 focus:relative focus:z-10",
            "w-full mx-4 p-6 bg-mediaCard-hoverBackground bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg",
            props.size === "md" ? "max-w-md" : "max-w-2xl",
          )}
        >
          <div className="transition-transform duration-300 overflow-y-scroll max-h-[90dvh] scrollbar-none">
            <Flare.Light
              flareSize={300}
              cssColorVar="--colors-mediaCard-hoverAccent"
              backgroundClass="bg-mediaCard-hoverBackground duration-100"
              className="rounded-3xl bg-background-main group-hover:opacity-100"
            />
            <Flare.Child className="pointer-events-auto relative mb-2p-[0.4em] transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                {props.title && (
                  <Heading2 className="!mt-0 !mb-0 pr-6">
                    {props.title}
                  </Heading2>
                )}
                <button
                  type="button"
                  className="text-s font-semibold text-type-secondary hover:text-white transition-transform hover:scale-95"
                  onClick={handleClose}
                >
                  <IconPatch icon={Icons.X} />
                </button>
              </div>
              <div className="text-lg text-type-secondary">
                {props.children}
              </div>
            </Flare.Child>
          </div>
        </Flare.Base>
      </div>
    </OverlayPortal>
  );
}

function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative">
        {/* Backdrop */}
        <div className="h-64 relative -mt-12">
          <div
            className="absolute inset-0 bg-mediaCard-hoverBackground"
            style={{
              maskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60px)",
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60px)",
            }}
          />
        </div>
        {/* Content */}
        <div className="px-6 pb-6 mt-[-30px]">
          <div className="h-8 w-3/4 bg-white/10 rounded mb-3" /> {/* Title */}
          <div className="space-y-2 mb-6">
            {/* Description */}
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-full" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
          </div>
          {/* Additional details */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
          </div>
          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-white/10 rounded-full" />
            <div className="h-6 w-24 bg-white/10 rounded-full" />
            <div className="h-6 w-16 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailsContent {
  backdrop?: string;
  title: string;
  overview?: string;
  genres?: { id: number; name: string }[];
  runtime?: number | null;
  episodes?: number;
  seasons?: number;
  language?: string;
  voteAverage?: number;
  voteCount?: number;
  releaseDate?: string;
  rating?: string;
  director?: string;
  actors?: string[];
}

function DetailsContent({ data }: { data: DetailsContent }) {
  const formatRuntime = (minutes?: number | null) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatVoteCount = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}K+`;
    }
    return count.toString();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative">
      {/* Backdrop */}
      <div className="h-64 relative -mt-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data.backdrop
              ? `url(${data.backdrop})`
              : undefined,
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60px)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60px)",
          }}
        />
      </div>
      {/* Content */}
      <div className="px-6 pb-6 mt-[-30px]">
        <h3 className="text-2xl font-bold text-white mb-4">{data.title}</h3>
        {data.overview && (
          <p className="text-sm text-white/90 mb-6">{data.overview}</p>
        )}
        {/* Additional details */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-6">
          {data.runtime && (
            <div className="flex items-center gap-1 text-white/80">
              <span className="font-medium">Runtime:</span>{" "}
              {formatRuntime(data.runtime)}
            </div>
          )}
          {data.language && (
            <div className="flex items-center gap-1 text-white/80">
              <span className="font-medium">Language:</span>{" "}
              {data.language.toUpperCase()}
            </div>
          )}
          {data.releaseDate && (
            <div className="flex items-center gap-1 text-white/80">
              <span className="font-medium">Release Date:</span>{" "}
              {formatDate(data.releaseDate)}
            </div>
          )}
          {data.rating && (
            <div className="flex items-center gap-1 text-white/80">
              <span className="font-medium">Rating:</span> {data.rating}
            </div>
          )}
          {data.voteAverage !== undefined &&
            data.voteCount !== undefined &&
            data.voteCount > 0 && (
              <div className="flex items-center gap-1 text-white/80">
                <span className="font-medium">Rating:</span>{" "}
                {data.voteAverage.toFixed(1)}/10
                <span className="text-white/60 text-[10px]">
                  ({formatVoteCount(data.voteCount)})
                </span>
              </div>
            )}
        </div>

        {/* Director and Cast */}
        <div className="space-y-4 mb-6">
          {data.director && (
            <div className="text-xs">
              <span className="font-medium text-white/80">Director:</span>{" "}
              <span className="text-white/70">{data.director}</span>
            </div>
          )}
          {data.actors && data.actors.length > 0 && (
            <div className="text-xs">
              <span className="font-medium text-white/80">Cast:</span>{" "}
              <span className="text-white/70">{data.actors.join(", ")}</span>
            </div>
          )}
        </div>

        {/* Genres */}
        {data.genres && data.genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/70"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DetailsModal(props: {
  id: string;
  data?: DetailsContent;
  isLoading?: boolean;
}) {
  const modal = useModal(props.id);

  return (
    <OverlayPortal darken close={modal.hide} show={modal.isShown}>
      <Helmet>
        <html data-no-scroll />
      </Helmet>
      <div className="flex absolute inset-0 items-center justify-center">
        <div className="relative w-full max-w-3xl mx-4">
          <Flare.Base
            className={classNames(
              "group -m-[0.705em] rounded-3xl bg-background-main transition-colors duration-300 focus:relative focus:z-10",
              "w-full bg-mediaCard-hoverBackground bg-opacity-60 backdrop-filter backdrop-blur-lg shadow-lg overflow-hidden",
            )}
          >
            <div className="transition-transform duration-300 overflow-y-scroll max-h-[90dvh] scrollbar-none">
              <Flare.Light
                flareSize={300}
                cssColorVar="--colors-mediaCard-hoverAccent"
                backgroundClass="bg-mediaCard-hoverBackground duration-100"
                className="rounded-3xl bg-background-main group-hover:opacity-100"
              />
              <Flare.Child className="pointer-events-auto relative">
                <div className="absolute right-4 top-4 z-10">
                  <button
                    type="button"
                    className="text-s font-semibold text-type-secondary hover:text-white transition-transform hover:scale-95"
                    onClick={modal.hide}
                  >
                    <IconPatch icon={Icons.X} />
                  </button>
                </div>
                <div className="pt-12">
                  {props.isLoading || !props.data ? (
                    <DetailsSkeleton />
                  ) : (
                    <DetailsContent data={props.data} />
                  )}
                </div>
              </Flare.Child>
            </div>
          </Flare.Base>
        </div>
      </div>
    </OverlayPortal>
  );
}
