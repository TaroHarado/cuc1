'use client';

export function ArchesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large arch 1 */}
      <div 
        className="absolute -bottom-[50%] left-1/2 -translate-x-1/2 w-[140%] h-[140%] rounded-[999px] border"
        style={{
          borderColor: 'rgba(229, 231, 235, 0.3)',
        }}
      />
      
      {/* Large arch 2 */}
      <div 
        className="absolute -bottom-[55%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] rounded-[999px] border"
        style={{
          borderColor: 'rgba(229, 231, 235, 0.25)',
        }}
      />
      
      {/* Large arch 3 */}
      <div 
        className="absolute -bottom-[60%] left-1/2 -translate-x-1/2 w-[100%] h-[100%] rounded-[999px] border"
        style={{
          borderColor: 'rgba(229, 231, 235, 0.2)',
        }}
      />
      
      {/* Large arch 4 */}
      <div 
        className="absolute -bottom-[65%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] rounded-[999px] border"
        style={{
          borderColor: 'rgba(229, 231, 235, 0.15)',
        }}
      />
    </div>
  );
}
