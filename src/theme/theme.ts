const theme = {
  token: {
    // Primary orange palette
    colorPrimary: "#ff6b35",
    colorPrimaryHover: "#ff8c5a",
    colorPrimaryActive: "#e55a2b",

    // Base colors
    colorBgContainer: "#ffffff",
    colorBgLayout: "#ffffff",
    colorText: "#000000",
    colorTextSecondary: "#666666",
    colorBorder: "#e5e5e5",

    // Status colors - harmonized with orange
    colorError: "#ff4757",
    colorWarning: "#ffa502",
    colorSuccess: "#2ed573",
  },

  components: {
    Layout: {
      headerBg: "#ffffff",
      siderBg: "#ffffff",
      bodyBg: "#ffffff",
    },

    Menu: {
      itemSelectedBg: "#fff2ee",
      itemHoverBg: "#fff8f5",
      itemSelectedColor: "#ff6b35",
    },

    Button: {
      primaryShadow: "0 2px 0 rgba(255, 107, 53, 0.1)",
    },

    Card: {
      colorBgContainer: "#ffffff",
    },

    Collapse: {
      headerBg: "#ffffff",
      borderlessContentBg: "#ffffff",
      contentBg: "#ffffff",
      contentPadding: 0,
      borderlessContentPadding: 0,
    },
  },
};

export default theme;
