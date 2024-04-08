import App from "../../src/App";
import Problem1 from "../../src/components/problems/Problem1";
import Problem2 from "../../src/components/problems/Problem2";
import Problem3 from "../../src/components/problems/Problem3";
import Problem4 from "../../src/components/problems/Problem4";
import Problem5 from "../../src/components/problems/Problem5";
import styles from "../../src/components/problems/Problem2.module.css";
import ReminderList from "../../src/components/p5/ReminderList";
import ReminderForm from "../../src/components/p5/ReminderForm";

describe("component tests", () => {
  describe("problem 1", () => {
    beforeEach(() => {
      cy.mount(<Problem1 />);
    });

    it("check the one have css", () => {
      cy.get("div")
        .children()
        .first()
        .should((div) => {
          const className = div.attr("class");
          expect(className, "should have class problem1style").to.include(
            "problem1style"
          );
          const minHeight = div.css("min-height");
          expect(minHeight, "should have css property").to.equal("200px");
        });
    });

    it("check the one don't have css", () => {
      cy.get("div")
        .children()
        .last()
        .should((div) => {
          const className = div.attr("class");
          expect(className, "should have class problem2style").to.include(
            "problem2style"
          );
          const minHeight = div.css("min-height");
          expect(minHeight, "should have default css property").to.equal("0px");
        });
    });
  });

  describe("problem 2", () => {
    beforeEach(() => {
      cy.mount(<Problem2 />);
    });

    it("check the one have css", () => {
      cy.get("div")
        .children()
        .first()
        .should((div) => {
          const className = div.attr("class");
          expect(className, "should have class problem1style").to.include(
            "problem1style"
          );
          const minHeight = div.css("min-height");
          expect(minHeight, "should have default css property").to.equal(
            "200px"
          );
        });
    });

    it("check the one use css module", () => {
      cy.get("div")
        .children()
        .last()
        .should((div) => {
          const className = div.attr("class");
          expect(className, "should have proper class name").to.include(
            styles.problem2style
          );
          const minHeight = div.css("min-height");
          expect(minHeight, "should have default css property").to.equal(
            "200px"
          );
        });
    });
  });

  describe("problem 3", () => {
    it("should update local storage on click and initialize with count from local storage", () => {
      cy.clearLocalStorage();
      cy.mount(<Problem3 />);

      cy.get("button")
        .click()
        .invoke("text")
        .then((text) => parseInt(text.match(/\d+/)[0], 10))
        .then((clickedCount) => {
          cy.mount(<Problem3 />);

          cy.window()
            .its("localStorage")
            .invoke("getItem", "clickCount")
            .then((storedCount) => {
              expect(
                storedCount,
                "should save the count in local storage"
              ).to.equal(`${clickedCount}`);
            });

          cy.get("button")
            .invoke("text")
            .then((text) => {
              expect(
                text,
                "should initialize with count from local storage"
              ).to.equal(`Number of clicks: ${clickedCount}`);
            });
        });
    });
  });

  describe("problem 4", () => {
    it("check for reminder list", () => {
      let arr = [...Array(3).keys()].map((item) => {
        return `Reminder-${item}`;
      });
      cy.mount(<Problem4 />);

      cy.get("div ul")
        .should((ul) => {
          expect(
            ul.text(),
            'should show "no reminders yet" if no reminder exists'
          ).to.include("no reminders yet");
        })
        .then(() => {
          arr.forEach((e) => {
            cy.get("input").type(e);
            cy.get("button").click();
          });

          cy.get("div ul li")
            .should((liList) => {
              expect(
                liList,
                "should show the correct number of reminders"
              ).to.have.length(arr.length);
            })
            .each((li, index) => {
              expect(li.text(), "should show the correct reminder").to.equal(
                arr[index]
              );
            });
        });
    });
  });

  describe("problem5", () => {
    let arr = [...Array(3).keys()].map((item) => {
      return `Reminder-${item}`;
    });

    it("empty local storage", () => {
      cy.clearLocalStorage();
      cy.mount(<Problem5 />);
      cy.get("div ul").should((e) => {
        expect(
          e.text(),
          'should show "no reminders yet" if no reminder exists'
        ).to.include("no reminders yet");
      });
    });

    it("functional tests", () => {
      cy.mount(<Problem5 />);
      arr.forEach((e) => {
        cy.get("input").type(e);
        cy.get("button").click();
      });

      cy.get("div ul")
        .children()
        .should((e) =>
          expect(
            e.length,
            "should show the correct number of reminders"
          ).to.equal(arr.length)
        );

      cy.get("div ul li").each((li, index) => {
        expect(li.text(), "should show the correct reminder").to.equal(
          arr[index]
        );
      });

      cy.mount(<Problem5 />).then(() => {
        let localList =
          localStorage.getItem("reminders") &&
          JSON.parse(localStorage.getItem("reminders"));

        cy.get("div ul")
          .children()
          .should((e) =>
            expect(
              e.length,
              "should show the correct number of reminders"
            ).to.equal(localList.length)
          );

        cy.get("div ul li").each((li, index) => {
          expect(li.text(), "should show the correct reminder").to.equal(
            localList[index]
          );
        });
      });
    });

    it("ReminderList props test", () => {
      cy.mount(<ReminderList reminders={arr} />);
      cy.get("div ul")
        .children()
        .should((e) =>
          expect(e.length, "should show number of reminders").to.equal(
            arr.length
          )
        );
      cy.get("div ul li").each((li, index) => {
        expect(li.text(), "should show the correct reminder").to.equal(
          arr[index]
        );
      });
    });

    it("ReminderForm props test", () => {
      let inputText = "test input";
      const setInput = cy.spy().as("setInputText");
      const setReminder = cy.spy().as("setReminders");
      cy.mount(
        <ReminderForm
          inputText={inputText}
          setInputText={setInput}
          setReminders={setReminder}
        />
      );

      cy.get("input").should((ele) => {
        expect(ele.val(), "input should have the initial value").to.equal(
          inputText
        );
      });
      cy.get("input").type("t");
      cy.get("@setInputText").should(() => {
        expect(
          setInput,
          "input should have been updated with the typed value"
        ).to.have.been.calledWith("test inputt");
      });
      cy.get("button").click();
      cy.get("@setInputText").should(() => {
        expect(
          setInput,
          "input should have been cleared after button click"
        ).to.have.been.calledWith("");
      });
      cy.get("@setReminders").should(() => {
        expect(
          setReminder,
          "setReminders should have been invoked after button click"
        ).to.have.been.called;
      });
    });
  });
});
