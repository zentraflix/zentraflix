import classNames from "classnames";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, Icons } from "@/components/Icon";
import { Heading2, Heading3, Paragraph } from "@/components/utils/Text";
import { useOverlayRouter } from "@/hooks/useOverlayRouter";

export function Card(props: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={classNames(
        {
          "bg-onboarding-card duration-300 border border-onboarding-border rounded-lg p-7": true,
          "hover:bg-onboarding-cardHover transition-colors cursor-pointer":
            !!props.onClick,
        },
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

export function CardContent(props: {
  title: ReactNode;
  description: ReactNode;
  subtitle: ReactNode;
  colorClass: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[1fr,auto] h-full">
      <div>
        <Icon
          icon={Icons.RISING_STAR}
          className={classNames("text-4xl mb-8 block", props.colorClass)}
        />
        <Heading3
          className={classNames(
            "!mt-0 !mb-0 !text-xs uppercase",
            props.colorClass,
          )}
        >
          {props.subtitle}
        </Heading3>
        <Heading2 className="!mb-0 !mt-1 !text-base">{props.title}</Heading2>
        <Paragraph className="max-w-[320px] !my-4">
          {props.description}
        </Paragraph>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export function MiniCardContent(props: {
  title: ReactNode;
  description: ReactNode;
  subtitle: ReactNode;
  colorClass: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[1fr,auto] h-full">
      <div className="flex">
        <div className="flex flex-col">
          <Heading3
            className={classNames(
              "!mt-0 !mb-0 !text-xs uppercase !mr-2",
              props.colorClass,
            )}
          >
            {props.subtitle}
          </Heading3>
          <Heading2 className="!mb-0 !mt-1 !text-sm">{props.title}</Heading2>
        </div>
        <Icon
          icon={Icons.ARROW_RIGHT}
          className={classNames(
            "text-3xl mb-4 ml-auto block",
            props.colorClass,
          )}
        />
      </div>
      <Paragraph className="max-w-[320px] !my-2 text-sm">
        {props.description}
      </Paragraph>
      <div className="text-sm">{props.children}</div>
    </div>
  );
}

export function Link(props: {
  children?: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
  target?: "_blank";
}) {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => {
        if (props.to) navigate(props.to);
      }}
      href={props.href}
      target={props.target}
      className={classNames(
        "text-onboarding-link cursor-pointer inline-flex gap-2 items-center group hover:opacity-75 transition-opacity",
        props.className,
      )}
      rel="noreferrer"
    >
      {props.children}
      <Icon
        icon={Icons.ARROW_RIGHT}
        className="group-hover:translate-x-0.5 transition-transform text-xl group-active:translate-x-0"
      />
    </a>
  );
}

export function AnotherLink(props: {
  children?: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
  target?: "_blank";
  id: string;
}) {
  const router = useOverlayRouter(props.id);

  return (
    <a
      onClick={() => {
        if (props.to) router.navigate(props.to);
      }}
      href={props.href}
      target={props.target}
      className={classNames(
        "text-onboarding-link cursor-pointer inline-flex gap-2 items-center group hover:opacity-75 transition-opacity",
        props.className,
      )}
      rel="noreferrer"
    >
      {props.children}
      <Icon
        icon={Icons.ARROW_RIGHT}
        className="group-hover:translate-x-0.5 transition-transform text-xl group-active:translate-x-0"
      />
    </a>
  );
}
