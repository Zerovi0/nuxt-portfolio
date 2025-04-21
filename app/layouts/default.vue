<template>
    <div id="default-layout" class="min-h-screen flex flex-col bg-background font-sans w-full">
      <Header />
    
      
      <div class="flex-1 bg-background">
        <main class="w-full px-4">
          <slot />
        </main>
      </div>
      <Footer />
    </div>
  </template>
  