import type { PrototypePage } from "@/lib/prototype-page";

type PrototypeDocumentProps = {
  page: PrototypePage;
};

export function PrototypeDocument({ page }: PrototypeDocumentProps) {
  return (
    <>
      {page.styles.map((style, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
      {page.scripts.map((script, index) => (
        <script key={index} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </>
  );
}
