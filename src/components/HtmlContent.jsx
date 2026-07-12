export default function HtmlContent({ html }) {
  if (!html) return null;

  // If content looks like HTML, render it directly; otherwise wrap as paragraph
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(html);

  if (isHtml) {
    return (
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:uppercase prose-headings:text-white prose-headings:mt-10 prose-headings:mb-4
          prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-5
          prose-img:w-full prose-img:my-8 prose-img:border prose-img:border-white/10 prose-img:rounded-2xl
          prose-a:text-cyber-violet prose-a:no-underline hover:prose-a:text-white
          prose-strong:text-white
          prose-blockquote:border-l-cyber-violet prose-blockquote:text-white/50 prose-blockquote:pl-4 prose-blockquote:my-6
          prose-ul:text-white/70 prose-ul:my-5 prose-ul:pl-6
          prose-ol:text-white/70 prose-ol:my-5 prose-ol:pl-6
          prose-li:my-1
          prose-hr:border-white/10 prose-hr:my-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <p className="text-white/70 leading-relaxed">{html}</p>
    </div>
  );
}