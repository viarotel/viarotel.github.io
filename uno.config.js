// import { defineConfig } from "unocss";
import unocssConfig from "@viarotel-org/unocss-config"

const primary = {
  DEFAULT: "#0464bb",
}

export default unocssConfig({
  safelist: ["hover:opacity-100", "opacity-70", "duration-500"],
  theme: {
    colors: {
      primary,
    },
  },
  shortcuts: {},
})
