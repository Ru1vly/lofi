from playwright.sync_api import sync_playwright, Page, expect

def verify_timer_styling(page: Page):
    """
    This script verifies the new styling of the Pomodoro timer.
    """
    # 1. Navigate to the application.
    page.goto("http://localhost:3000")

    # 2. Wait for the main app container and timer to be visible.
    expect(page.locator(".App")).to_be_visible()
    expect(page.locator(".timer-container")).to_be_visible()

    # 3. Take a screenshot to visually verify the changes.
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_timer_styling(page)
        browser.close()

if __name__ == "__main__":
    main()