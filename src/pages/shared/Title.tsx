type SectionTitleProps = {
  title: string;
  subTitle?: string;
};

export const Title = ({ title, subTitle }: SectionTitleProps) => {
  return (
    <div>
      <h1 className="text-[#27272A] font-sans font-semibold text-[32px] leading-[38.4px]">
        {title}
      </h1>

      {subTitle && (
        <p className="text-[#27272A] font-inter font-normal text-[16px] leading-[25.6px] max-w-[618px] mt-2">
          {subTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
