<template>
  <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background dark:bg-background sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground dark:text-muted-foreground-dark transition-colors hover:text-foreground dark:hover:text-foreground-dark md:h-8 md:w-8"
            >
              <Home class="h-5 w-5" />
              <span class="sr-only">Dashboard</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
    <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
                href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground dark:text-muted-foreground-dark transition-colors hover:text-foreground dark:hover:text-foreground-dark md:h-8 md:w-8"
            >
              <Settings class="h-5 w-5" />
              <span class="sr-only">Settings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Home, Settings } from 'lucide-vue-next';
</script>

<style scoped>
</style>
