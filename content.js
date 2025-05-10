// Conversation data for different personas
const personas = {
  persona1: {
    name: "Sarah Chen",
    title: "Product Manager at TechCorp",
    avatar: "https://i.pravatar.cc/150?img=1",
    conversations: [
      { sender: "user", text: "Hi Sarah, great connecting with you!", timestamp: "2024-03-15 10:00 AM" },
      { sender: "other", text: "Thanks for reaching out! Always good to connect with fellow product enthusiasts.", timestamp: "2024-03-15 10:30 AM" },
      { sender: "user", text: "Would love to hear about your experience at TechCorp!", timestamp: "2024-03-15 11:00 AM" },
      { sender: "other", text: "Happy to share! Been here 3 years, focusing on AI products. What\'s your background?", timestamp: "2024-03-15 11:15 AM" }
    ]
  },
  persona2: {
    name: "Mike Rodriguez",
    title: "VP Sales at StartupX",
    avatar: "https://i.pravatar.cc/150?img=2",
    conversations: [
      { sender: "user", text: "Hi Mike! I wanted to tell you about Grupa - we\'re revolutionizing team collaboration.", timestamp: "2024-03-10 09:00 AM" },
      { sender: "other", text: "Thanks, but we\'re not looking for new collaboration tools at the moment.", timestamp: "2024-03-10 09:30 AM" },
      { sender: "user", text: "No problem! Would you be open to a quick demo in the future?", timestamp: "2024-03-10 09:45 AM" },
      { sender: "other", text: "I\'ll pass for now, but appreciate the offer.", timestamp: "2024-03-10 10:00 AM" }
    ]
  },
  persona3: {
    name: "Emily Watson",
    title: "CTO at InnovateCo",
    avatar: "https://i.pravatar.cc/150?img=3",
    conversations: [
      { sender: "user", text: "Emily, excited to share Grupa with you - it could transform your team\'s workflow!", timestamp: "2024-03-13 02:00 PM" },
      { sender: "other", text: "Interesting! We\'ve been looking for something like this. Tell me more.", timestamp: "2024-03-13 02:30 PM" },
      { sender: "user", text: "Great! Grupa helps teams collaborate 3x faster with AI-powered workflows. When works for a demo?", timestamp: "2024-03-13 02:45 PM" },
      { sender: "other", text: "Sounds promising. Let me check with my team and get back to you next week.", timestamp: "2024-03-13 03:00 PM" }
    ]
  },
  persona4: {
    name: "David Park",
    title: "Engineering Director at ScaleUp",
    avatar: "https://i.pravatar.cc/150?img=4",
    conversations: [
      { sender: "user", text: "David, would love to introduce you to Grupa!", timestamp: "2024-02-01 11:00 AM" },
      { sender: "other", text: "Perfect timing! We need something like this.", timestamp: "2024-02-01 11:30 AM" },
      { sender: "user", text: "Great! Here\'s a link to schedule a demo.", timestamp: "2024-02-01 11:45 AM" },
      { sender: "other", text: "Demo was great! Moving forward with implementation next month.", timestamp: "2024-02-15 03:00 PM" },
      { sender: "user", text: "Excellent! I\'ll have our success team reach out.", timestamp: "2024-02-15 03:15 PM" }
    ]
  }
};

// Helper to get the last message for list display
function getLastMessageDetails(conversations) {
  if (!conversations || conversations.length === 0) {
    return { text: "No messages yet", time: "" };
  }
  const lastConv = conversations[conversations.length - 1];
  const timeParts = lastConv.timestamp.split(' ');
  const time = timeParts.length > 1 ? timeParts.slice(1).join(' ') : lastConv.timestamp;
  return {
    text: lastConv.text,
    time: time
  };
}

function createPersonaListItem(personaId, personaData) {
  const listItem = document.createElement('div');
  listItem.className = 'injected-persona-list-item';
  listItem.setAttribute('data-persona-id', personaId);

  const lastMessageDetails = getLastMessageDetails(personaData.conversations);

  listItem.innerHTML = `
    <img src="${personaData.avatar}" alt="${personaData.name}" class="persona-list-avatar">
    <div class="persona-list-details">
      <div class="persona-list-name-time">
        <span class="persona-list-name">${personaData.name}</span>
        <span class="persona-list-time">${lastMessageDetails.time}</span>
      </div>
      <p class="persona-list-last-message">${lastMessageDetails.text.substring(0, 35)}${lastMessageDetails.text.length > 35 ? '...' : ''}</p>
    </div>
  `;

  listItem.addEventListener('click', () => {
    document.querySelectorAll('.injected-persona-list-item, .msg-conversation-listitem--selected').forEach(item => {
        item.classList.remove('active');
        item.classList.remove('msg-conversation-listitem--selected'); // For actual LinkedIn items
    });
    listItem.classList.add('active');
    displayPersonaConversation(personaId);
  });
  return listItem;
}

function displayPersonaConversation(personaId) {
  const personaData = personas[personaId];
  const chatDisplayArea = document.querySelector('.msg-s-message-list-container, .msg-convo-wrapper, .msgl-scrollable');
  
  if (!chatDisplayArea) {
    console.error("Target chat display area not found. Cannot display conversation.");
    const oldInjectedConversations = document.querySelector('.injected-conversations');
    if (oldInjectedConversations) oldInjectedConversations.remove();
    return;
  }
  chatDisplayArea.innerHTML = ''; 

  const chatHeader = document.createElement('div');
  chatHeader.className = 'injected-chat-header';
  // Mimic LinkedIn's header structure for name and title if possible, or use a simplified one
  const topCard = document.querySelector('.msg-conversation-card__row'); // Check if this class exists
  if (topCard) {
      chatHeader.innerHTML = `
        <div class="msg-thread-header"> <!-- A plausible wrapper -->
            <img src="${personaData.avatar}" alt="${personaData.name}" class="chat-header-avatar eva-display-presence profile-picture presence-entity__image msg-thread-header__profile-picture圓 ">
            <div class="msg-thread-header__details">
                <h2 class="msg-thread-header__name t-16 t-bold">${personaData.name}</h2>
                <p class="msg-thread-header__occupations t-12 t-black--light t-normal">${personaData.title}</p>
            </div>
            <div class="msg-thread-header__controls">...</div> <!-- Placeholder for controls -->
        </div>
      `;
  } else {
       chatHeader.innerHTML = `
        <img src="${personaData.avatar}" alt="${personaData.name}" class="chat-header-avatar">
        <div class="chat-header-info">
          <h2 class="chat-header-name">${personaData.name}</h2>
          <p class="chat-header-title">${personaData.title}</p>
        </div>
        <div class="chat-header-actions">...</div> 
      `;
  }
  chatDisplayArea.appendChild(chatHeader);

  const messagesList = document.createElement('div');
  messagesList.className = 'injected-messages-list'; 
  // Add class that LinkedIn uses for its message list for scrolling, e.g. msg-s-message-list
  messagesList.classList.add('msg-s-message-list');


  personaData.conversations.forEach(msg => {
    const messageWrapper = document.createElement('div'); 
    messageWrapper.className = `msg-s-message-list__event clearfix msg-s-message-list__event--${msg.sender === 'user' ? 'member' : 'other'}`; // Using LinkedIn like classes

    const messageBubble = document.createElement('div');
    messageBubble.className = 'msg-s-event-listitem__body t-14 t-black--light t-normal'; // Generic bubble style
    if (msg.sender === 'user') {
      messageBubble.classList.add('msg-s-message-group__content'); // Sent message style
    } else {
      // Received message style might differ or have an avatar part
    }
    messageBubble.innerHTML = `<p class=" hydrogenation">${msg.text}</p><time class="msg-s-message-list__time-heading t-12 t-black--light t-normal">${msg.timestamp}</time>`;
    
    // Structure might involve an avatar for received messages
    if (msg.sender === 'other') {
        const avatarImg = `<img src="${personaData.avatar}" alt="${personaData.name}" class="profile-picture msg-s-message-group__profile-picture presence-entity__image圓"> `
        messageWrapper.innerHTML = avatarImg;
    }
    messageWrapper.appendChild(messageBubble);
    messagesList.appendChild(messageWrapper);
  });
  chatDisplayArea.appendChild(messagesList);

  const messageInputArea = document.createElement('div');
  messageInputArea.className = 'injected-message-input msg-form'; // Use LinkedIn's msg-form
  messageInputArea.innerHTML = `
    <div class="msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1">
      <p class="msg-form__placeholder t-14 t-black--light t-normal">Write a message...</p>
    </div>
    <div class="msg-form__right-actions display-flex align-items-center">
        <button class="msg-form__send-button artdeco-button artdeco-button--1 artdeco-button--primary" disabled>Send</button>
    </div>
    <div class="msg-form__bottom-actions"> <!-- Placeholder for attach, GIF, emoji -->
      <button class="artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view msg-form__footer-action-button">📎</button>
      <button class="artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view msg-form__footer-action-button">GIF</button>
      <button class="artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view msg-form__footer-action-button">🙂</button>
    </div>
  `;
  chatDisplayArea.appendChild(messageInputArea);
}

// function injectNewPersonas() {
//   const oldInjectedBlock = document.querySelector('.injected-conversations');
//   if (oldInjectedBlock) {
//     oldInjectedBlock.remove();
//   }

//   const conversationListContainer = document.querySelector('.msg-conversations-container__list ul, .msg-conversations-container__list .artdeco-list, .scaffold-layout__aside ul[class*="list"]');
  
//   if (!conversationListContainer) {
//     console.warn("LinkedIn conversation list container not found. Cannot inject new personas as list items.");
//     return;
//   }

//   Object.entries(personas).forEach(([personaId, personaData]) => {
//     const listItem = createPersonaListItem(personaId, personaData);
//     conversationListContainer.prepend(listItem); 
//   });
  
//   // Do not auto-select a persona; user will click.
// }

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', injectNewPersonas);
// } else {
//   injectNewPersonas();
// } 

// --- Logic to hide the top banner using MutationObserver ---

const bannerSelector = 'div[role="alert"]'; // SIMPLIFIED SELECTOR FOR DEBUGGING

function hideTargetBanner(targetNode) {
  if (targetNode && targetNode.style) {
    targetNode.style.setProperty('display', 'none', 'important');
    targetNode.style.setProperty('visibility', 'hidden', 'important');
    console.log('[BANNER HIDER] Banner hidden or re-hidden (display & visibility):', targetNode);
  }
}

function findAndHideBanner() {
  const banner = document.querySelector(bannerSelector);
  if (banner) {
    console.log('[BANNER HIDER] Initial find: Banner found with selector:', bannerSelector, banner);
    hideTargetBanner(banner);
    return true;
  } else {
    console.log('[BANNER HIDER] Initial find: Banner NOT found with selector:', bannerSelector);
  }
  return false;
}

findAndHideBanner();

const observer = new MutationObserver((mutationsList, obs) => {
  // console.log('[BANNER HIDER] MutationObserver callback triggered. Mutations:', mutationsList);
  let foundAndHidBannerInThisBatch = false;

  for (const mutation of mutationsList) {
    // console.log('[BANNER HIDER] Mutation type:', mutation.type);
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches && node.matches(bannerSelector)) {
            console.log('[BANNER HIDER] Added node matches selector:', node);
            hideTargetBanner(node);
            foundAndHidBannerInThisBatch = true;
          } else if (node.querySelector) {
            const bannerInside = node.querySelector(bannerSelector);
            if (bannerInside) {
              console.log('[BANNER HIDER] Added node contains banner:', bannerInside);
              hideTargetBanner(bannerInside);
              foundAndHidBannerInThisBatch = true;
            }
          }
        }
      });
    } else if (mutation.type === 'attributes') {
      if (mutation.target.matches && mutation.target.matches(bannerSelector)) {
        // console.log('[BANNER HIDER] Attribute changed on a potential banner element:', mutation.target);
        if (mutation.target.style.display !== 'none') {
          console.log('[BANNER HIDER] Banner style changed to be visible, re-hiding...', mutation.target);
          hideTargetBanner(mutation.target);
          foundAndHidBannerInThisBatch = true;
        }
      }
    }
  }
  // if (foundAndHidBannerInThisBatch) {
  //   console.log('[BANNER HIDER] Observer confirmed banner processing in this batch.');
  // }
});

observer.observe(document.documentElement, { 
  childList: true, 
  subtree: true, 
  attributes: true, 
  attributeFilter: ['style']
});

// Note: It's good practice to disconnect the observer if the extension is unloaded 
// or the content script is re-injected, but for this case, it's generally fine.
// window.addEventListener('unload', () => observer.disconnect()); 