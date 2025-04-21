/**
 * Utility functions for text formatting and indentation
 */

/**
 * Checks if a line contains specific HTML tags
 * @param line The line to check
 * @param openTag The opening tag to look for
 * @param closeTag The closing tag to look for
 * @returns Object with isTag and betweenTags flags
 */
export function getLineMeta(
  index: number, 
  lines: string[], 
  openTag: string = '&lt;About me&gt;', 
  closeTag: string = '&lt;/About me&gt;'
) {
  const line = lines[index] || '';
  const isTag = line.includes(openTag) || line.includes(closeTag);
  let betweenTags = false;
  
  if (!isTag) {
    let open = false;
    // Look backwards for opening tag
    for (let i = index - 1; i >= 0; i--) {
      if (lines[i]?.includes(openTag)) { 
        open = true; 
        break; 
      }
      if (lines[i]?.includes(closeTag)) break;
    }
    
    // If we found an opening tag, look forward for closing tag
    if (open) {
      for (let i = index + 1; i < lines.length; i++) {
        if (lines[i]?.includes(closeTag)) { 
          betweenTags = true; 
          break; 
        }
      }
    }
  }
  
  return { isTag, betweenTags };
}

/**
 * Returns a Tailwind CSS class for indentation based on space count
 * @param spaces Number of spaces to indent
 * @returns Tailwind CSS class for padding-left
 */
export function getIndentClass(spaces: number) {
  const indentLevel = Math.floor(spaces / 2);
  switch (indentLevel) {
    case 0: return 'pl-0';
    case 1: return 'pl-4';
    case 2: return 'pl-8';
    case 3: return 'pl-12';
    case 4: return 'pl-16';
    default: return 'pl-20';
  }
}

/**
 * Counts the number of leading spaces in a string
 * @param line The string to check
 * @returns Number of leading spaces
 */
export function countLeadingSpaces(line: string) {
  return line.match(/^ */)?.[0].length || 0;
}

/**
 * Formats text with proper indentation for HTML display
 * @param text The text to format
 * @param isTypingComplete Whether typing animation is complete
 * @returns Formatted HTML string with proper indentation
 */
export function formatIndentedText(
  text: string, 
  isTypingComplete: boolean,
  openTag: string = '&lt;About me&gt;', 
  closeTag: string = '&lt;/About me&gt;'
) {
  const lines = String(text || '').split('\n');
  let htmlOutput = '';
  
  lines.forEach((line, idx) => {
    const meta = getLineMeta(idx, lines, openTag, closeTag);
    const baseIndent = countLeadingSpaces(line || '');
    const totalIndent = baseIndent + (meta.betweenTags && !meta.isTag ? 2 : 0);
    const indentClass = getIndentClass(totalIndent);
    const blockClass = meta.betweenTags && !meta.isTag ? 'text-wrap break-words' : '';
    const content = (line || '').substring(baseIndent);
    htmlOutput += `<div class="${indentClass} ${blockClass} min-h-[1.2em] block">${content}</div>`;
  });
  
  // Handle empty text during typing animation
  if (lines.length === 1 && lines[0] === '' && !isTypingComplete) {
    htmlOutput = `<div class="min-h-[1.2em]">${text}</div>`;
  }
  
  return htmlOutput;
}
